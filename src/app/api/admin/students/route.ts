import { NextRequest, NextResponse } from "next/server";
import { collections } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

const STAFF_EMAILS = (process.env.STAFF_EMAILS || "Ridgewoodmirganj@gmail.com,admin@ridgewoodmirganj.in")
  .split(",").map(s => s.trim().toLowerCase()).filter(Boolean);

function isStaff(email?: string | null): boolean {
  if (!email) return false;
  return STAFF_EMAILS.includes(email.toLowerCase());
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const col = await collections.students();
    const items = await col.find({}).sort({ createdAt: -1 }).limit(100).toArray();
    return NextResponse.json({ students: items.map((it: any) => ({ ...it, id: String(it._id) })) });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await req.json();
    let parentId = body.parentId;
    if (!parentId) {
      const phone = (body.parentPhone || "").replace(/\D/g, "").slice(-10);
      if (!/^\d{10}$/.test(phone)) return NextResponse.json({ error: "Valid parent phone required" }, { status: 400 });
      const passwordHash = await bcrypt.hash(body.parentPassword || "ridgewood123", 10);
      const parentsCol = await collections.parents();
      const parent = await parentsCol.insertOne({
        name: (body.parentName || "").slice(0, 100),
        phone, passwordHash,
        email: (body.parentEmail || "").slice(0, 200) || null,
        createdAt: new Date(),
      });
      parentId = String(parent.insertedId);
    }

    const col = await collections.students();
    const result = await col.insertOne({
      name: (body.name || "").slice(0, 100),
      rollNo: (body.rollNo || "").slice(0, 50),
      classSection: (body.classSection || "").slice(0, 100),
      classTeacher: (body.classTeacher || "").slice(0, 100),
      parentName: (body.parentName || "").slice(0, 100),
      parentId,
      attendance: Math.min(100, Math.max(0, parseInt(body.attendance) || 95)),
      averageGrade: (body.averageGrade || "A").slice(0, 10),
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true, id: result.insertedId });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
