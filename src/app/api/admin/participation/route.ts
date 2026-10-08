/**
 * Admin API — Staff-only participation management.
 * POST /api/admin/participation — create a participation entry for a student
 * DELETE /api/admin/participation — delete by id
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

const STAFF_EMAILS = (process.env.STAFF_EMAILS || "Ridgewoodmirganj@gmail.com,admin@ridgewoodmirganj.in")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

function isStaff(email?: string | null): boolean {
  if (!email) return false;
  return STAFF_EMAILS.includes(email.toLowerCase());
}

const CUID_RE = /^c[a-z0-9]{20,30}$/i;

// POST — create participation entry
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden — staff only" }, { status: 403 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const studentId = body.studentId;
  if (!CUID_RE.test(studentId)) return NextResponse.json({ error: "Invalid studentId" }, { status: 400 });

  const entry = await db.participation.create({
    data: {
      studentId,
      event: (body.event || "").slice(0, 200),
      date: (body.date || "").slice(0, 50),
      result: (body.result || "Participation").slice(0, 100),
      category: (body.category || "Academics").slice(0, 50),
    },
  });

  return NextResponse.json({ ok: true, entry });
}

// DELETE — delete participation entry by id
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden — staff only" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!CUID_RE.test(id || "")) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  await db.participation.delete({ where: { id: id! } });
  return NextResponse.json({ ok: true });
}
