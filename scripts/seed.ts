/**
 * Seed Ridgewood School demo data:
 *  - Parent: Mr & Mrs Sharma (phone: 7052224726, password: ridgewood123)
 *  - Student: Aarohi Sharma
 *  - Report Card (Term 1, 2025-26) with 6 subjects
 *  - 3 Notices (Important / Holiday / Event)
 *  - 5 Participation records
 *  - 6 Public Gallery items
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("→ Cleaning existing data…");
  await db.subject.deleteMany();
  await db.reportCard.deleteMany();
  await db.participation.deleteMany();
  await db.noticeRead.deleteMany();
  await db.notice.deleteMany();
  await db.galleryItem.deleteMany();
  await db.student.deleteMany();
  await db.parent.deleteMany();

  console.log("→ Creating parent…");
  const passwordHash = await bcrypt.hash("ridgewood123", 10);
  const parent = await db.parent.create({
    data: {
      name: "Mr & Mrs Sharma",
      phone: "7052224726",
      passwordHash,
      email: "parent.ridgewood@example.com", // parent email — NOT a staff email, so they can't upload
    },
  });

  console.log("→ Creating staff account…");
  // Staff account (school admin) — uses the staff email so /api/upload allows uploads
  const staffHash = await bcrypt.hash("ridgewood123", 10);
  const staff = await db.parent.create({
    data: {
      name: "Ridgewood Admin",
      phone: "7352224726",
      passwordHash: staffHash,
      email: "Ridgewoodmirganj@gmail.com", // STAFF email — can upload photos/videos
    },
  });

  console.log("→ Creating student…");
  const student = await db.student.create({
    data: {
      name: "Aarohi Sharma",
      rollNo: "RW-2025-0089",
      classSection: "Year 3 · Section B",
      classTeacher: "Ms Priya Verma",
      parentName: parent.name,
      parentId: parent.id,
      attendance: 96,
      averageGrade: "A",
    },
  });

  // Also link the student to the staff account so they can see data when signed in
  // (in a real app, staff would see ALL students; here we just link one for demo)
  await db.student.create({
    data: {
      name: "Aarohi Sharma (Staff View)",
      rollNo: "RW-2025-0089",
      classSection: "Year 3 · Section B",
      classTeacher: "Ms Priya Verma",
      parentName: staff.name,
      parentId: staff.id,
      attendance: 96,
      averageGrade: "A",
    },
  });

  console.log("→ Creating report card + subjects…");
  const reportCard = await db.reportCard.create({
    data: {
      studentId: student.id,
      term: "Term 1 · 2025–26",
      remarks:
        "Aarohi shows excellent curiosity and creativity. Consistent participation in class discussions.",
    },
  });
  const subjects = [
    { name: "English", marks: 88, grade: "A" },
    { name: "Mathematics", marks: 91, grade: "A" },
    { name: "EVS", marks: 95, grade: "A+" },
    { name: "Hindi", marks: 86, grade: "A" },
    { name: "Art & Craft", marks: 96, grade: "A+" },
    { name: "Physical Ed.", marks: 90, grade: "A" },
  ];
  for (const s of subjects) {
    await db.subject.create({
      data: { ...s, reportCardId: reportCard.id },
    });
  }

  console.log("→ Creating notices…");
  const notices = [
    {
      title: "Parent–Teacher Meeting — Term 1 Results",
      body: "PTM scheduled for Saturday, October 11 from 9:00 AM to 12:30 PM. Please confirm your slot through the office.",
      tag: "Important",
      date: "Oct 04, 2025",
    },
    {
      title: "Dussehra Holidays — School Closed",
      body: "School will remain closed from October 1 to October 7 for Dussehra. Classes resume on October 8.",
      tag: "Holiday",
      date: "Sep 28, 2025",
    },
    {
      title: "Inter-House Sports Day — Volunteers Needed",
      body: "Parents interested in volunteering for the Sports Day on October 25 may contact the office by October 10.",
      tag: "Event",
      date: "Sep 21, 2025",
    },
  ];
  for (const n of notices) {
    await db.notice.create({ data: n });
  }

  console.log("→ Creating participation records…");
  const participation = [
    { event: "Inter-House Elocution", date: "Sep 12, 2025", result: "1st Place", category: "Literary" },
    { event: "Independence Day Art", date: "Aug 15, 2025", result: "Participation", category: "Art & Craft" },
    { event: "Friendship Day Choir", date: "Aug 03, 2025", result: "2nd Place", category: "Music" },
    { event: "Science Fair Project", date: "Jul 28, 2025", result: "Best Project", category: "Academics" },
    { event: "Annual Sports Day", date: "Mar 14, 2025", result: "Participation", category: "Sports" },
  ];
  for (const p of participation) {
    await db.participation.create({
      data: { ...p, studentId: student.id },
    });
  }

  console.log("→ Seeding gallery items…");
  const gallery = [
    { title: "Independence Day Celebration", tag: "Patriotic", date: "Aug 15, 2025", imageUrl: "/gallery/independence-day-1.png" },
    { title: "Teachers' Day with Bachpan", tag: "Event", date: "Sep 05, 2025", imageUrl: "/gallery/bachpan-teachers-day.png" },
    { title: "My Country, My Pride", tag: "Patriotic", date: "Aug 14, 2025", imageUrl: "/gallery/my-country-pride-1.png" },
    { title: "Friendship Day", tag: "Event", date: "Aug 03, 2025", imageUrl: "/gallery/friendship-day.png" },
    { title: "Cultural Day Performance", tag: "Cultural", date: "Jul 22, 2025", imageUrl: "/gallery/cultural-day.png" },
    { title: "Classroom Moments", tag: "Classroom", date: "—", imageUrl: "/gallery/uniform-students-1.png" },
    { title: "Festive Dress-up", tag: "Cultural", date: "Jul 18, 2025", imageUrl: "/gallery/cultural-2.png" },
    { title: "Free Activity Zone", tag: "Classroom", date: "Jul 12, 2025", imageUrl: "/gallery/classroom-2.png" },
    { title: "Tiny Flag-Bearers", tag: "Patriotic", date: "Aug 15, 2025", imageUrl: "/gallery/independence-day-2.png" },
    { title: "Traditional Day", tag: "Cultural", date: "Jul 04, 2025", imageUrl: "/gallery/cultural-3.png" },
    { title: "My Country My Pride", tag: "Patriotic", date: "Aug 14, 2025", imageUrl: "/gallery/my-country-pride-3.png" },
    { title: "Lesson Time", tag: "Classroom", date: "—", imageUrl: "/gallery/classroom-1.png" },
  ];
  for (const g of gallery) {
    await db.galleryItem.create({
      data: {
        ...g,
        type: "photo",
        isPublic: true,
      },
    });
  }

  console.log("\n✅ Seed complete!");
  console.log("   Parent login — phone: 7052224726, password: ridgewood123");
  console.log("   Student: Aarohi Sharma (Year 3, Section B)");
  console.log("   6 subjects in report card");
  console.log("   3 notices, 5 participation events, 12 gallery items");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
