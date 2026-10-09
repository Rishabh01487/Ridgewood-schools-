import { NextRequest, NextResponse } from "next/server";
import { collections } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

const CUID_RE = /^c[a-z0-9]{20,30}$/i;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const parentId = (session.user as any).parentId;
    if (!parentId) return NextResponse.json({ error: "No parent ID" }, { status: 400 });

    const studentsCol = await collections.students();
    const students = await studentsCol.find({ parentId }).toArray();

    const noticesCol = await collections.notices();
    const notices = await noticesCol.find({}).sort({ createdAt: -1 }).limit(10).toArray();

    const readsCol = await collections.noticeReads();
    const reads = await readsCol.find({ parentId }).toArray();
    const readIds = new Set(reads.map((r: any) => String(r.noticeId)));

    // Get report cards and participation for each student
    const result = [];
    for (const s of students) {
      const rcCol = await collections.reportCards();
      const reportCards = await rcCol.find({ studentId: String(s._id) }).toArray();
      
      const subCol = await collections.subjects();
      for (const rc of reportCards) {
        (rc as any).subjects = await subCol.find({ reportCardId: String(rc._id) }).toArray();
      }

      const partCol = await collections.participation();
      const participation = await partCol.find({ studentId: String(s._id) }).toArray();

      result.push({
        id: String(s._id),
        name: s.name,
        rollNo: s.rollNo,
        classSection: s.classSection,
        classTeacher: s.classTeacher,
        attendance: s.attendance,
        averageGrade: s.averageGrade,
        reportCards: reportCards.map((rc: any) => ({
          id: String(rc._id),
          term: rc.term,
          remarks: rc.remarks,
          pdfUrl: rc.pdfUrl,
          subjects: rc.subjects.map((sub: any) => ({
            id: String(sub._id),
            name: sub.name,
            marks: sub.marks,
            grade: sub.grade,
          })),
        })),
        participation: participation.map((p: any) => ({
          id: String(p._id),
          event: p.event,
          date: p.date,
          result: p.result,
          category: p.category,
        })),
      });
    }

    return NextResponse.json({
      parent: { name: session.user.name, email: session.user.email },
      students: result,
      notices: notices.map((n: any) => ({
        id: String(n._id),
        title: n.title,
        body: n.body,
        tag: n.tag,
        date: n.date,
        read: readIds.has(String(n._id)),
      })),
    });
  } catch (err: any) {
    console.error("[parent/me] GET error:", err);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const parentId = (session.user as any).parentId;
    const body = await req.json();
    const noticeId = body?.noticeId;
    if (!noticeId) return NextResponse.json({ error: "noticeId required" }, { status: 400 });

    const col = await collections.noticeReads();
    const existing = await col.findOne({ noticeId, parentId });
    if (existing) return NextResponse.json({ ok: true, alreadyRead: true });

    await col.insertOne({ noticeId, parentId, readAt: new Date() });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[parent/me] POST error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
