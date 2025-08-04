import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

/**
 * Configure Cloudinary from env vars:
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 *
 * If env vars are missing, this route falls back to local file storage in /public/gallery/uploads/
 * so the upload feature still works in dev environments without Cloudinary configured.
 *
 * SECURITY: Only school staff (admin emails defined in STAFF_EMAILS env var, comma-separated)
 * can upload. Parents can only VIEW gallery content via /api/gallery.
 */

const hasCloudinary =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// List of staff emails allowed to upload. Comma-separated in STAFF_EMAILS env var.
// Falls back to a hardcoded admin list for demo purposes.
const STAFF_EMAILS = (process.env.STAFF_EMAILS || "ankurarchi06@gmail.com,admin@ridgewoodmirganj.in")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

function isStaff(email?: string | null): boolean {
  if (!email) return false;
  return STAFF_EMAILS.includes(email.toLowerCase());
}

// POST /api/upload — SCHOOL STAFF ONLY (admins).
// Parents can view gallery content via /api/gallery but cannot upload.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized — please sign in with a staff account." },
      { status: 401 }
    );
  }

  // Strict staff email allowlist check
  if (!isStaff(session.user.email)) {
    return NextResponse.json(
      {
        error:
          "Forbidden — only school staff can upload gallery content. Parents can view photos in the Parent Portal.",
      },
      { status: 403 }
    );
  }

  // File size limit (50 MB)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 50 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large — maximum 50 MB." },
      { status: 413 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "File required" }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = [
    "image/jpeg", "image/png", "image/webp", "image/gif", "image/avif",
    "video/mp4", "video/webm", "video/quicktime",
  ];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `File type "${file.type}" not allowed. Use JPEG, PNG, WebP, GIF, MP4, WebM, or MOV.` },
      { status: 415 }
    );
  }

  const title = (formData.get("title") as string)?.trim() || "Untitled";
  const tag = (formData.get("tag") as string)?.trim() || "General";
  const date = (formData.get("date") as string)?.trim() || null;
  const type = (formData.get("type") as string) === "video" ? "video" : "photo";
  const isPublicStr = (formData.get("isPublic") as string) || "true";
  const isPublic = isPublicStr === "true";
  const studentId = (formData.get("studentId") as string) || null;

  let imageUrl = "";
  let thumbnailUrl: string | null = null;
  let publicId: string | null = null;

  if (hasCloudinary) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(dataUri, {
          folder: "ridgewood-school",
          resource_type: type === "video" ? "video" : "image",
          overwrite: false,
        })
        .then(resolve)
        .catch(reject);
    });
    imageUrl = result.secure_url;
    thumbnailUrl = result.eager?.[0]?.secure_url || null;
    publicId = result.public_id;
  } else {
    // Local fallback — save to /public/gallery/uploads/
    const fs = await import("fs/promises");
    const path = await import("path");
    const uploadDir = path.join(process.cwd(), "public", "gallery", "uploads");
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch {}
    // Sanitize filename: keep alphanumeric + dot/dash/underscore only
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 60)}`;
    const filePath = path.join(uploadDir, safeName);
    const bytes = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(bytes));
    imageUrl = `/gallery/uploads/${safeName}`;
  }

  const item = await db.galleryItem.create({
    data: {
      title: title.slice(0, 200),
      description: null,
      imageUrl,
      thumbnailUrl,
      publicId,
      type,
      tag: tag.slice(0, 50),
      date: date ? date.slice(0, 50) : null,
      isPublic,
      studentId: studentId || null,
      uploadedBy: session.user.email || "staff",
    },
  });

  return NextResponse.json({ ok: true, item });
}

// GET /api/upload — list all uploaded items (admin staff only view)
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isStaff(session.user.email)) {
    return NextResponse.json(
      { error: "Forbidden — staff access only." },
      { status: 403 }
    );
  }
  const items = await db.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ items });
}
