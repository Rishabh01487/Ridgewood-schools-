/**
 * /api/admission — Admission registration API
 *   POST — save registration to MongoDB + notify school admin via email
 *   GET  — staff-only: list all submissions
 */
import { NextRequest, NextResponse } from "next/server";
import { collections } from "@/lib/mongodb";
import { sendAdmissionNotification } from "@/lib/email";

// POST — save admission form submission
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.studentName || !body.fatherName || !body.fatherMobile || !body.admissionClass) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const record = {
      studentName: String(body.studentName).slice(0, 100),
      dob: String(body.dob || "").slice(0, 20),
      ageYears: String(body.ageYears || "").slice(0, 5),
      gender: String(body.gender || "").slice(0, 20),
      admissionClass: String(body.admissionClass).slice(0, 50),
      academicYear: String(body.academicYear || "2026–2027").slice(0, 20),
      previousSchool: String(body.previousSchool || "").slice(0, 200),
      previousClass: String(body.previousClass || "").slice(0, 50),
      fatherName: String(body.fatherName).slice(0, 100),
      fatherOccupation: String(body.fatherOccupation || "").slice(0, 100),
      fatherMobile: String(body.fatherMobile).slice(0, 15),
      fatherEmail: String(body.fatherEmail || "").slice(0, 200),
      motherName: String(body.motherName || "").slice(0, 100),
      motherOccupation: String(body.motherOccupation || "").slice(0, 100),
      motherMobile: String(body.motherMobile || "").slice(0, 15),
      motherEmail: String(body.motherEmail || "").slice(0, 200),
      residentialAddress: String(body.residentialAddress || "").slice(0, 500),
      transport: String(body.transport || "").slice(0, 10),
      siblingName: String(body.siblingName || "").slice(0, 100),
      siblingClass: String(body.siblingClass || "").slice(0, 50),
      specialNeeds: String(body.specialNeeds || "").slice(0, 500),
      motherTongue: String(body.motherTongue || "").slice(0, 50),
      category: String(body.category || "").slice(0, 20),
      documents: body.documents || {},
      status: "pending",
      createdAt: new Date(),
    };

    const col = await collections.admissions();
    const result = await col.insertOne(record);

    // Send email notification to school admin
    await sendAdmissionNotification(record);

    return NextResponse.json({ ok: true, id: result.insertedId });
  } catch (err: any) {
    console.error("[admission] Error:", err);
    return NextResponse.json({ error: "Failed to save registration" }, { status: 500 });
  }
}

// GET — list all admission submissions (for staff dashboard)
export async function GET() {
  try {
    const col = await collections.admissions();
    const items = await col.find({}).sort({ createdAt: -1 }).limit(100).toArray();
    return NextResponse.json({ admissions: items });
  } catch (err: any) {
    console.error("[admission] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
