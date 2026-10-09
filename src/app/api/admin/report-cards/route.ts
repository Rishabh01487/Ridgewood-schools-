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
    const col = await collections.report-cards();
    const items = await col.find({}).sort({ createdAt: -1 }).limit(100).toArray();
    return NextResponse.json({ items: items.map((it: any) => ({ ...it, id: String(it._id) })) });
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
    const col = await collections.report-cards();
    const result = await col.insertOne({ ...body, createdAt: new Date() });
    return NextResponse.json({ ok: true, id: result.insertedId });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isStaff(session.user.email)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const { ObjectId } = await import("mongodb");
    const col = await collections.report-cards();
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
