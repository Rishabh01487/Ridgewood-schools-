import nodemailer from "nodemailer";

/**
 * Send an email notification to school admin when a new admission form is submitted.
 * The email contains:
 * 1. A full HTML table with all the registration details (like a filled form)
 * 2. A plain-text version with all details
 * 3. Links to view the submission in the admin dashboard
 *
 * Uses Gmail SMTP (configure GMAIL_USER + GMAIL_APP_PASSWORD env vars).
 * If email creds not set, logs to console instead.
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "Ridgewoodmirganj@gmail.com";
const GMAIL_USER = process.env.GMAIL_USER || ADMIN_EMAIL;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";

export async function sendEnquiryNotification(data: any) {
  const subject = `New Enquiry: ${data.parentName} — ${data.grade || "Not specified"} | Ridgewood School`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Poppins', Arial, sans-serif; background: #faf7f0; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; border: 2px solid #c9a961;">

    <!-- Header -->
    <div style="background: #1A2B4C; padding: 24px 32px; text-align: center;">
      <h1 style="color: #faf7f0; margin: 0; font-size: 20px; letter-spacing: 2px;">RIDGEWOOD SCHOOL, MIRGANJ</h1>
      <p style="color: #c9a961; margin: 4px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">New Admission Enquiry</p>
    </div>

    <!-- Enquiry Details -->
    <div style="padding: 28px;">
      <h2 style="color: #1A2B4C; font-size: 16px; border-bottom: 2px solid #c9a961; padding-bottom: 6px; margin: 0 0 16px;">ENQUIRY DETAILS</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef; width: 35%;">Parent's Name</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.parentName || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Phone Number</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.phone || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Email</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.email || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Child's Age</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.age || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Grade of Interest</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 700;">${data.grade || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Message</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.message || "—"}</td></tr>
      </table>

      <div style="background: #f9f6ef; border-radius: 8px; padding: 16px; text-align: center; margin-top: 20px;">
        <p style="color: #1A2B4C; font-size: 13px; margin: 0 0 8px;"><strong>Submitted on:</strong> ${new Date().toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })}</p>
        <p style="color: #666; font-size: 12px; margin: 0;">This is an automated email from Ridgewood School, Mirganj. Contact: +91 70522 24726</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

  const textBody = `
RIDGEWOOD SCHOOL, MIRGANJ — NEW ENQUIRY

Parent's Name: ${data.parentName}
Phone: ${data.phone}
Email: ${data.email || "—"}
Child's Age: ${data.age || "—"}
Grade of Interest: ${data.grade || "—"}
Message: ${data.message || "—"}

Submitted: ${new Date().toLocaleString("en-IN")}
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
      console.log("[email] Enquiry email sent to", ADMIN_EMAIL);
    } catch (err) {
      console.error("[email] Failed to send enquiry email:", err);
    }
  } else {
    console.log("[email] GMAIL_APP_PASSWORD not set — would send enquiry to:", ADMIN_EMAIL);
    console.log("[email] Enquiry details:", textBody);
  }
}

export async function sendAdmissionNotification(data: any) {
  const subject = `New Registration: ${data.studentName} — ${data.admissionClass} | Ridgewood School`;

  // Build a proper registration form HTML (looks like a filled form)
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Poppins', Arial, sans-serif; background: #faf7f0; margin: 0; padding: 20px;">
  <div style="max-width: 700px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; border: 2px solid #c9a961;">

    <!-- Header -->
    <div style="background: #1A2B4C; padding: 24px 32px; text-align: center;">
      <h1 style="color: #faf7f0; margin: 0; font-size: 22px; letter-spacing: 2px;">RIDGEWOOD SCHOOL, MIRGANJ</h1>
      <p style="color: #c9a961; margin: 4px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">A CBSE Curriculum School</p>
      <p style="color: #faf7f0; margin: 12px 0 0; font-size: 16px; font-weight: 600;">REGISTRATION FORM — ${data.academicYear || "2026–2027"}</p>
    </div>

    <!-- Registration Details -->
    <div style="padding: 32px;">

      <!-- Student Section -->
      <h2 style="color: #1A2B4C; font-size: 16px; border-bottom: 2px solid #c9a961; padding-bottom: 6px; margin: 0 0 16px;">STUDENT INFORMATION</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef; width: 35%;">Student's Name</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5; text-transform: uppercase;">${data.studentName || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Date of Birth</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.dob || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Age</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.ageYears || "—"} years</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Gender</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.gender || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Class for Admission</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 700;">${data.admissionClass || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Previous School</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.previousSchool || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Previous Class</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.previousClass || "—"}</td></tr>
      </table>

      <!-- Father Section -->
      <h2 style="color: #1A2B4C; font-size: 16px; border-bottom: 2px solid #c9a961; padding-bottom: 6px; margin: 0 0 16px;">FATHER'S DETAILS</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef; width: 35%;">Name</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.fatherName || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Occupation</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.fatherOccupation || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Mobile</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.fatherMobile || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Email</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.fatherEmail || "—"}</td></tr>
      </table>

      <!-- Mother Section -->
      <h2 style="color: #1A2B4C; font-size: 16px; border-bottom: 2px solid #c9a961; padding-bottom: 6px; margin: 0 0 16px;">MOTHER'S DETAILS</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef; width: 35%;">Name</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.motherName || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Occupation</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.motherOccupation || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Mobile</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.motherMobile || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Email</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.motherEmail || "—"}</td></tr>
      </table>

      <!-- Additional Info -->
      <h2 style="color: #1A2B4C; font-size: 16px; border-bottom: 2px solid #c9a961; padding-bottom: 6px; margin: 0 0 16px;">ADDITIONAL INFORMATION</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef; width: 35%;">Residential Address</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.residentialAddress || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Transport Required</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.transport || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Sibling Name</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.siblingName || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Sibling Class</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.siblingClass || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Mother Tongue</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.motherTongue || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Category</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.category || "—"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Special Needs</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.specialNeeds || "None"}</td></tr>
      </table>

      <!-- Documents Uploaded -->
      <h2 style="color: #1A2B4C; font-size: 16px; border-bottom: 2px solid #c9a961; padding-bottom: 6px; margin: 0 0 16px;">DOCUMENTS UPLOADED</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef; width: 35%;">Student Photo</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.documents?.photo ? "✅ Uploaded: " + data.documents.photo : "Not uploaded"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Birth Certificate</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.documents?.birthCert ? "✅ Uploaded: " + data.documents.birthCert : "Not uploaded"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Aadhaar — Student</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.documents?.aadhaarStudent ? "✅ Uploaded: " + data.documents.aadhaarStudent : "Not uploaded"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Aadhaar — Father</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.documents?.aadhaarFather ? "✅ Uploaded: " + data.documents.aadhaarFather : "Not uploaded"}</td></tr>
        <tr><td style="padding: 8px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f6ef;">Aadhaar — Mother</td><td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${data.documents?.aadhaarMother ? "✅ Uploaded: " + data.documents.aadhaarMother : "Not uploaded"}</td></tr>
      </table>

      <!-- Footer -->
      <div style="background: #f9f6ef; border-radius: 8px; padding: 16px; text-align: center; margin-top: 20px;">
        <p style="color: #1A2B4C; font-size: 13px; margin: 0 0 8px;"><strong>Submitted on:</strong> ${new Date().toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })}</p>
        <p style="color: #666; font-size: 12px; margin: 0;">View all registrations in the <a href="${process.env.NEXTAUTH_URL || ""}/#admin-panel" style="color: #c9a961;">Admin Dashboard</a></p>
        <p style="color: #666; font-size: 11px; margin: 8px 0 0;">This is an automated email from Ridgewood School, Mirganj. Contact: +91 70522 24726</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

  const textBody = `
RIDGEWOOD SCHOOL, MIRGANJ — REGISTRATION FORM
Academic Year: ${data.academicYear || "2026–2027"}

STUDENT INFORMATION
  Name: ${data.studentName}
  DOB: ${data.dob}
  Age: ${data.ageYears} years
  Gender: ${data.gender}
  Class: ${data.admissionClass}
  Previous School: ${data.previousSchool || "—"}
  Previous Class: ${data.previousClass || "—"}

FATHER'S DETAILS
  Name: ${data.fatherName}
  Occupation: ${data.fatherOccupation || "—"}
  Mobile: ${data.fatherMobile}
  Email: ${data.fatherEmail || "—"}

MOTHER'S DETAILS
  Name: ${data.motherName || "—"}
  Occupation: ${data.motherOccupation || "—"}
  Mobile: ${data.motherMobile || "—"}
  Email: ${data.motherEmail || "—"}

ADDITIONAL INFORMATION
  Address: ${data.residentialAddress || "—"}
  Transport: ${data.transport || "—"}
  Sibling: ${data.siblingName || "—"} (${data.siblingClass || "—"})
  Mother Tongue: ${data.motherTongue || "—"}
  Category: ${data.category || "—"}
  Special Needs: ${data.specialNeeds || "None"}

DOCUMENTS
  Photo: ${data.documents?.photo || "Not uploaded"}
  Birth Certificate: ${data.documents?.birthCert || "Not uploaded"}
  Aadhaar Student: ${data.documents?.aadhaarStudent || "Not uploaded"}
  Aadhaar Father: ${data.documents?.aadhaarFather || "Not uploaded"}
  Aadhaar Mother: ${data.documents?.aadhaarMother || "Not uploaded"}

Submitted: ${new Date().toLocaleString("en-IN")}

View all at: ${process.env.NEXTAUTH_URL || ""}/#admin-panel
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
      console.log("[email] Registration form email sent to", ADMIN_EMAIL);

      // Also send a confirmation to the parent if email provided
      if (data.fatherEmail) {
        await transporter.sendMail({
          from: GMAIL_USER,
          to: data.fatherEmail,
          subject: `Registration Received — ${data.studentName} | Ridgewood School`,
          html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: #1A2B4C; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: #faf7f0; margin: 0; font-size: 20px;">RIDGEWOOD SCHOOL, MIRGANJ</h1>
    <p style="color: #c9a961; margin: 4px 0 0;">Registration Confirmed</p>
  </div>
  <div style="padding: 24px; background: #fff; border: 1px solid #ddd;">
    <p>Dear Parent,</p>
    <p>Thank you for registering <strong>${data.studentName}</strong> for <strong>${data.admissionClass}</strong> for the academic year <strong>${data.academicYear}</strong>.</p>
    <p>We have received the registration form with all the details. Our admissions team will contact you at <strong>${data.fatherMobile}</strong> within <strong>1 working day</strong> to schedule a campus visit and complete the admission process.</p>
    <p>If you have any questions, please contact us at <strong>+91 70522 24726</strong> or <strong>Ridgewoodmirganj@gmail.com</strong>.</p>
    <p style="margin-top: 24px; color: #666; font-size: 13px;">Warm regards,<br>Admissions Team<br>Ridgewood School, Mirganj<br>From Roots to Ridges</p>
  </div>
</div>`,
        });
        console.log("[email] Confirmation email sent to parent:", data.fatherEmail);
      }
    } catch (err) {
      console.error("[email] Failed to send:", err);
    }
  } else {
    console.log("[email] GMAIL_APP_PASSWORD not set — logging instead. Would send to:", ADMIN_EMAIL);
  }
}
