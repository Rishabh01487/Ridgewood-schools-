/**
 * Admin API — Staff-only management of school data.
 *
 * /api/admin/students      — GET (list), POST (create student + link to parent)
 *
 * All routes require staff auth (email must be in STAFF_EMAILS).
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

const STAFF_EMAILS = (process.env.STAFF_EMAILS || "ankurarchi06@gmail.com,admin@ridgewoodmirganj.in")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

function isStaff(email?: string | null): boolean {
  if (!email) return false;
  return STAFF_EMAILS.includes(email.toLowerCase());
}

const CUID_RE = /^c[a-z0-9]{20,30}$/i;

// GET /api/admin/students — list all students (with their parent info)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isStaff(session.user.email)) {
    return NextResponse.json({ error: "Forbidden — staff only" }, { status: 403 });
  }

  const students = await db.student.findMany({
    include: {
      parent: { select: { id: true, name: true, phone: true, email: true } },
      reportCards: { include: { subjects: true } },
      participation: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ students });
}

// POST /api/admin/students — create a new student linked to a parent
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isStaff(session.user.email)) {
    return NextResponse.json({ error: "Forbidden — staff only" }, { status: 403 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let parentId = body.parentId;
  if (!parentId) {
    const phone = (body.parentPhone || "").replace(/\D/g, "").slice(-10);
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Valid 10-digit parent phone required" }, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(body.parentPassword || "ridgewood123", 10);
    const parent = await db.parent.create({
      data: {
        name: (body.parentName || "").slice(0, 100),
        phone,
        passwordHash,
        email: (body.parentEmail || "").slice(0, 200) || null,
      },
    });
    parentId = parent.id;
  }

  if (!CUID_RE.test(parentId)) {
    return NextResponse.json({ error: "Invalid parentId" }, { status: 400 });
  }

  const student = await db.student.create({
    data: {
      name: (body.name || "").slice(0, 100),
      rollNo: (body.rollNo || "").slice(0, 50),
      classSection: (body.classSection || "").slice(0, 100),
      classTeacher: (body.classTeacher || "").slice(0, 100),
      parentName: (body.parentName || "").slice(0, 100),
      parentId,
      attendance: Math.min(100, Math.max(0, parseInt(body.attendance) || 95)),
      averageGrade: (body.averageGrade || "A").slice(0, 10),
    },
  });

  return NextResponse.json({ ok: true, student });
}
