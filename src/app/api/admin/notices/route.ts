/**
 * Admin API — Staff-only notice management.
 * POST /api/admin/notices — create a notice
 * DELETE /api/admin/notices — delete a notice by id
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

// POST — create notice
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden — staff only" }, { status: 403 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const notice = await db.notice.create({
    data: {
      title: (body.title || "").slice(0, 200),
      body: (body.body || "").slice(0, 1000),
      tag: (body.tag || "General").slice(0, 50),
      date: (body.date || "").slice(0, 50),
    },
  });

  return NextResponse.json({ ok: true, notice });
}

// DELETE — delete notice by id
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden — staff only" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!CUID_RE.test(id || "")) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  await db.notice.delete({ where: { id: id! } });
  return NextResponse.json({ ok: true });
}
