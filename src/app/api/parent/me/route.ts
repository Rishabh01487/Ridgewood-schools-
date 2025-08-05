import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * /api/parent/me
 *   GET  — returns the logged-in parent's students + dashboard snapshot
 *   POST — mark a notice as read (body: { noticeId })
 *
 * Security:
 * - Requires valid NextAuth session
 * - parentId is taken from the JWT (server-side), not the request body — parents can only see their own data
 * - noticeId is validated as a cuid before being used
 * - All Prisma queries are scoped by parentId — no IDOR possible
 */

const CUID_RE = /^c[a-z0-9]{20,30}$/i;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parentId = (session.user as any).parentId;
  if (!parentId || !CUID_RE.test(parentId)) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  const students = await db.student.findMany({
    where: { parentId }, // strict scoping — only this parent's students
    include: {
      reportCards: { include: { subjects: true } },
      participation: { orderBy: { createdAt: "desc" } },
    },
  });

  const notices = await db.notice.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  // Get this parent's read-state (so we can show NEW badges correctly)
  const readRecords = await db.noticeRead.findMany({
    where: { parentId },
    select: { noticeId: true },
  });
  const readIds = new Set(readRecords.map((r) => r.noticeId));

  return NextResponse.json({
    parent: { name: session.user.name, email: session.user.email },
    students: students.map((s) => ({
      id: s.id,
      name: s.name,
      rollNo: s.rollNo,
      classSection: s.classSection,
      classTeacher: s.classTeacher,
      attendance: s.attendance,
      averageGrade: s.averageGrade,
      reportCards: s.reportCards.map((rc) => ({
        id: rc.id,
        term: rc.term,
        remarks: rc.remarks,
        pdfUrl: rc.pdfUrl,
        subjects: rc.subjects.map((sub) => ({
          id: sub.id,
          name: sub.name,
          marks: sub.marks,
          grade: sub.grade,
        })),
      })),
      participation: s.participation.map((p) => ({
        id: p.id,
        event: p.event,
        date: p.date,
        result: p.result,
        category: p.category,
      })),
    })),
    notices: notices.map((n) => ({
      id: n.id,
      title: n.title,
      body: n.body,
      tag: n.tag,
      date: n.date,
      read: readIds.has(n.id),
    })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parentId = (session.user as any).parentId;
  if (!parentId || !CUID_RE.test(parentId)) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const noticeId = typeof body?.noticeId === "string" ? body.noticeId : "";
  if (!CUID_RE.test(noticeId)) {
    return NextResponse.json({ error: "Invalid noticeId" }, { status: 400 });
  }

  // Verify the notice exists (prevents creating a NoticeRead for a non-existent notice)
  const notice = await db.notice.findUnique({ where: { id: noticeId } });
  if (!notice) {
    return NextResponse.json({ error: "Notice not found" }, { status: 404 });
  }

  // Idempotent: don't create duplicates
  const existing = await db.noticeRead.findFirst({
    where: { noticeId, parentId },
  });
  if (existing) {
    return NextResponse.json({ ok: true, alreadyRead: true });
  }
  await db.noticeRead.create({ data: { noticeId, parentId } });
  return NextResponse.json({ ok: true });
}
