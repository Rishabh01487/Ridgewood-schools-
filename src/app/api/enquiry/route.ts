/**
 * /api/enquiry — Public enquiry form API
 *   POST — save enquiry to MongoDB + email school admin
 *   GET  — staff-only: list all enquiries
 */
import { NextRequest, NextResponse } from "next/server";
import { collections } from "@/lib/mongodb";
import { sendEnquiryNotification } from "@/lib/email";

// POST — save enquiry form submission
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.parentName || !body.phone) {
      return NextResponse.json(
        { error: "Parent name and phone are required" },
        { status: 400 }
      );
    }

    const record = {
      parentName: String(body.parentName).slice(0, 100),
      phone: String(body.phone).slice(0, 20),
      email: String(body.email || "").slice(0, 200),
      age: String(body.age || "").slice(0, 50),
      grade: String(body.grade || "").slice(0, 50),
      message: String(body.message || "").slice(0, 2000),
      status: "new",
      createdAt: new Date(),
    };

    // Try to save to MongoDB (fail gracefully if DB is down)
    try {
      const col = await collections.enquiries();
      await col.insertOne(record);
      console.log("[enquiry] Saved to MongoDB:", record.parentName);
    } catch (dbErr) {
      console.error("[enquiry] MongoDB save failed (logging instead):", dbErr.message);
      // Even if MongoDB fails, still try to send the email so the enquiry is not lost
    }

    // Send email notification to school admin
    await sendEnquiryNotification(record);

    return NextResponse.json({ ok: true, message: "Enquiry submitted successfully" });
  } catch (err: any) {
    console.error("[enquiry] Error:", err);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

// GET — list all enquiries (for staff dashboard)
export async function GET() {
  try {
    const col = await collections.enquiries();
    const items = await col.find({}).sort({ createdAt: -1 }).limit(100).toArray();
    return NextResponse.json({ enquiries: items });
  } catch (err: any) {
    console.error("[enquiry] GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
