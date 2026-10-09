/**
 * Create staff + seed parent account in MongoDB.
 *
 * Usage:
 *   DATABASE_URL="mongodb+srv://..." node scripts/create-staff.js
 *
 * This creates a parent record with:
 *   - name: "School Admin"
 *   - phone: <your phone, 10 digits>
 *   - email: "Ridgewoodmirganj@gmail.com"  (this is what triggers admin access)
 *   - password: <your password>  (bcrypt-encrypted)
 *
 * After running this, you can log in at the Parent Portal using:
 *   Phone: <your phone>
 *   Password: <your password>
 * And you'll automatically get admin access because your email matches STAFF_EMAILS.
 */
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));

(async () => {
  const uri = process.env.DATABASE_URL;
  if (!uri || uri.includes("YOUR_CLUSTER")) {
    console.error("❌ Set DATABASE_URL in .env first (MongoDB Atlas connection string)");
    process.exit(1);
  }

  console.log("=".repeat(60));
  console.log("  RIDGEWOOD SCHOOL — Staff Account Creator");
  console.log("=".repeat(60));

  const name = (await ask("Staff name (e.g. Ashok Kumar): ")).trim() || "School Admin";
  const phone = (await ask("10-digit phone (e.g. 7052224726): ")).trim();
  const email = (await ask("Staff email (ENTER for Ridgewoodmirganj@gmail.com): ")).trim()
    || "Ridgewoodmirganj@gmail.com";
  const password = (await ask("Password (ENTER for ridgewood123): ")).trim() || "ridgewood123";

  if (!/^\d{10}$/.test(phone)) {
    console.error("❌ Phone must be exactly 10 digits");
    process.exit(1);
  }

  console.log("\n⏳ Connecting to MongoDB...");
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const parents = db.collection("parents");

    // Upsert: update if phone exists, insert if not
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await parents.updateOne(
      { phone },
      { $set: { name, phone, email: email.toLowerCase(), passwordHash, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );

    console.log("\n✅ Staff account saved!");
    console.log("=".repeat(60));
    console.log("  LOGIN DETAILS (save these!)");
    console.log("=".repeat(60));
    console.log(`  Phone:    ${phone}`);
    console.log(`  Password: ${password}`);
    console.log(`  Email:    ${email}`);
    console.log("=".repeat(60));
    console.log("\nYou can now log in at the Parent Portal section of your website.");
    console.log("Because your email matches STAFF_EMAILS, you'll get admin access automatically.");
    console.log("\nTo create PARENT accounts for students, log in → Admin Dashboard → Add Student.");
  } catch (err) {
    console.error("❌ Failed:", err.message);
  } finally {
    await client.close();
    rl.close();
  }
})();
