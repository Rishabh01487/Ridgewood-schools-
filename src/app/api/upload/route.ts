import { NextRequest, NextResponse } from "next/server";
import { collections } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

const STAFF_EMAILS = (process.env.STAFF_EMAILS || "Ridgewoodmirganj@gmail.com,admin@ridgewoodmirganj.in")
  .split(",").map(s => s.trim().toLowerCase()).filter(Boolean);

function isStaff(email?: string | null): boolean {
  if (!email) return false;
  return STAFF_EMAILS.includes(email.toLowerCase());
}

const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;
if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden — staff only" }, { status: 403 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "File required" }, { status: 400 });

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "video/quicktime"];
  if (!allowedTypes.includes(file.type)) return NextResponse.json({ error: "File type not allowed" }, { status: 415 });

  const title = (formData.get("title") as string)?.trim() || "Untitled";
  const tag = (formData.get("tag") as string)?.trim() || "General";
  const date = (formData.get("date") as string)?.trim() || null;
  const type = (formData.get("type") as string) === "video" ? "video" : "photo";
  const isPublic = (formData.get("isPublic") as string) === "true";

  let imageUrl = "";
  let publicId: string | null = null;

  if (hasCloudinary) {
    const bytes = await file.arrayBuffer();
    const dataUri = `data:${file.type};base64,${Buffer.from(bytes).toString("base64")}`;
    const result: any = await cloudinary.uploader.upload(dataUri, { folder: "ridgewood-school", resource_type: type === "video" ? "video" : "image" });
    imageUrl = result.secure_url;
    publicId = result.public_id;
  } else {
    const fs = await import("fs/promises");
    const path = await import("path");
    const uploadDir = path.join(process.cwd(), "public", "gallery", "uploads");
    try { await fs.mkdir(uploadDir, { recursive: true }); } catch {}
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 60)}`;
    await fs.writeFile(path.join(uploadDir, safeName), Buffer.from(await file.arrayBuffer()));
    imageUrl = `/gallery/uploads/${safeName}`;
  }

  const col = await collections.galleryItems();
  await col.insertOne({
    title: title.slice(0, 200), imageUrl, publicId, type,
    tag: tag.slice(0, 50), date, isPublic,
    uploadedBy: session.user.email || "staff", createdAt: new Date(),
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const col = await collections.galleryItems();
  const items = await col.find({}).sort({ createdAt: -1 }).limit(100).toArray();
  return NextResponse.json({ items: items.map((it: any) => ({ ...it, id: String(it._id) })) });
}
