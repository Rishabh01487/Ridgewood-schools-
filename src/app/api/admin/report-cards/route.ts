/**
 * Admin API — Staff-only report card management.
 * POST /api/admin/report-cards — create a report card with subjects for a student
 * DELETE /api/admin/report-cards — delete a report card by id
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

const STAFF_EMAILS = (process.env.STAFF_EMAILS || "ankurarchi06@gmail.com,admin@ridgewoodmirganj.in")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

function isStaff(email?: string | null): boolean {
  if (!email) return false;
  return STAFF_EMAILS.includes(email.toLowerCase());
}

const CUID_RE = /^c[a-z0-9]{20,30}$/i;

// POST — create report card with subjects
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden — staff only" }, { status: 403 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const studentId = body.studentId;
  if (!CUID_RE.test(studentId)) return NextResponse.json({ error: "Invalid studentId" }, { status: 400 });

  const subjects = Array.isArray(body.subjects) ? body.subjects : [];
  if (subjects.length === 0) return NextResponse.json({ error: "At least one subject required" }, { status: 400 });

  const reportCard = await db.reportCard.create({
    data: {
      studentId,
      term: (body.term || "Term 1 · 2025–26").slice(0, 100),
      remarks: (body.remarks || "").slice(0, 500) || null,
      pdfUrl: (body.pdfUrl || "").slice(0, 500) || null,
      subjects: {
        create: subjects.map((s: any) => ({
          name: (s.name || "").slice(0, 100),
          marks: Math.min(100, Math.max(0, parseInt(s.marks) || 0)),
          grade: (s.grade || "").slice(0, 10),
        })),
      },
    },
    include: { subjects: true },
  });

  return NextResponse.json({ ok: true, reportCard });
}

// DELETE — delete report card by id
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden — staff only" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!CUID_RE.test(id || "")) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  await db.reportCard.delete({ where: { id: id! } });
  return NextResponse.json({ ok: true });
}
