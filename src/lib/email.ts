import nodemailer from "nodemailer";

/**
 * Send an email notification to school admin when a new admission form is submitted.
 * Uses Gmail SMTP (configure ADMIN_EMAIL + GMAIL_APP_PASSWORD env vars).
 * If email creds not set, logs to console instead.
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "Ridgewoodmirganj@gmail.com";
const GMAIL_USER = process.env.GMAIL_USER || ADMIN_EMAIL;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";

export async function sendAdmissionNotification(data: any) {
  const subject = `New Admission Registration: ${data.studentName} (${data.admissionClass})`;
  
  const textBody = `
New Admission Registration Received!

Student: ${data.studentName}
Class: ${data.admissionClass}
Academic Year: ${data.academicYear}
Date of Birth: ${data.dob}
Gender: ${data.gender}

Father: ${data.fatherName}
Father Mobile: ${data.fatherMobile}
Father Email: ${data.fatherEmail || "N/A"}

Mother: ${data.motherName || "N/A"}
Mother Mobile: ${data.motherMobile || "N/A"}

Address: ${data.residentialAddress}
Transport: ${data.transport || "N/A"}

Previous School: ${data.previousSchool || "N/A"}
Previous Class: ${data.previousClass || "N/A"}

Sibling: ${data.siblingName || "N/A"} (${data.siblingClass || "N/A"})
Category: ${data.category || "N/A"}
Mother Tongue: ${data.motherTongue || "N/A"}
Special Needs: ${data.specialNeeds || "None"}

Submitted: ${new Date().toLocaleString("en-IN")}

View all submissions at: ${process.env.NEXTAUTH_URL || "https://ridgewoodmirganj.in"}/#admin-panel
`;

  const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1A2B4C;">New Admission Registration 🎉</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Student</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.studentName}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Class</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.admissionClass}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">DOB</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.dob}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Father</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.fatherName} (${data.fatherMobile})</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Mother</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.motherName || "N/A"} (${data.motherMobile || "N/A"})</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Address</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.residentialAddress}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Submitted</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date().toLocaleString("en-IN")}</td></tr>
  </table>
  <p style="margin-top: 16px; color: #666;">View all submissions in the <a href="${process.env.NEXTAUTH_URL || ""}/#admin-panel">Admin Dashboard</a></p>
</div>
`;

  if (GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
      });
      await transporter.sendMail({
        from: GMAIL_USER,
        to: ADMIN_EMAIL,
        subject,
        text: textBody,
        html: htmlBody,
      });
      console.log("[email] Admission notification sent to", ADMIN_EMAIL);
    } catch (err) {
      console.error("[email] Failed to send:", err);
    }
  } else {
    console.log("[email] GMAIL_APP_PASSWORD not set — notification not sent. Would send to:", ADMIN_EMAIL);
    console.log("[email] Subject:", subject);
  }
}
