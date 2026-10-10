/**
 * Create staff + seed parent account in MongoDB.
 *
 * Two ways to use:
 *
 * 1) Interactive (you'll be prompted for name, phone, email, password):
 *      node scripts/create-staff.js
 *
 * 2) Non-interactive (pass args directly):
 *      node scripts/create-staff.js --phone=7052224726 --password=ridgewood123
 *      node scripts/create-staff.js --name="Ashok Kumar" --phone=7052224726 \
 *          --email=Ridgewoodmirganj@gmail.com --password=ridgewood123
 *
 * Requires DATABASE_URL in .env to be a valid MongoDB connection string:
 *   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/ridgewood?retryWrites=true&w=majority
 *
 * After running this, you can log in at the Parent Portal using:
 *   Phone: <your phone>
 *   Password: <your password>
 * And you'll automatically get admin access because your email matches STAFF_EMAILS.
 */
// Try to load dependencies; print a friendly error if they're missing.
let MongoClient, bcrypt;
try {
  MongoClient = require("mongodb").MongoClient;
} catch (e) {
  console.error("❌ The 'mongodb' package is not installed.");
  console.error("   Run this first to install all dependencies:\n");
  console.error("       npm install\n");
  console.error("   (or if that fails:  npm install --legacy-peer-deps)");
  console.error("   (or with bun:        bun install)\n");
  process.exit(1);
}
try {
  bcrypt = require("bcryptjs");
} catch (e) {
  console.error("❌ The 'bcryptjs' package is not installed.");
  console.error("   Run this first to install all dependencies:\n");
  console.error("       npm install\n");
  process.exit(1);
}

const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));

// Parse command-line args like --phone=7052224726
function parseArgs() {
  const args = {};
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([a-z]+)=(.*)$/i);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

(async () => {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("❌ DATABASE_URL is not set in .env");
    console.error("   Add a MongoDB Atlas connection string to .env first:");
    console.error('   DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/ridgewood?retryWrites=true&w=majority"');
    process.exit(1);
  }
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    console.error("❌ DATABASE_URL must be a MongoDB connection string");
    console.error("   Current value: " + uri);
    console.error("   Expected format: mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/ridgewood?retryWrites=true&w=majority");
    console.error("");
    console.error("   Get a free MongoDB Atlas cluster at https://www.mongodb.com/atlas");
    console.error("   Then put the connection string in your .env file as DATABASE_URL");
    process.exit(1);
  }

  const args = parseArgs();

  console.log("=".repeat(60));
  console.log("  RIDGEWOOD SCHOOL — Staff Account Creator");
  console.log("=".repeat(60));

  const name =
    args.name ||
    ((await ask("Staff name (e.g. Ashok Kumar): ")).trim() || "School Admin");
  const phone =
    args.phone ||
    (await ask("10-digit phone (e.g. 7052224726): ")).trim();
  const email =
    args.email ||
    (await ask("Staff email (ENTER for Ridgewoodmirganj@gmail.com): ")).trim() ||
    "Ridgewoodmirganj@gmail.com";
  const password =
    args.password ||
    (await ask("Password (ENTER for ridgewood123): ")).trim() ||
    "ridgewood123";

  if (!/^\d{10}$/.test(phone)) {
    console.error("❌ Phone must be exactly 10 digits (got: " + phone + ")");
    process.exit(1);
  }

  console.log("\n⏳ Connecting to MongoDB...");
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    const db = client.db();
    const parents = db.collection("parents");

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await parents.updateOne(
      { phone },
      {
        $set: {
          name,
          phone,
          email: email.toLowerCase(),
          passwordHash,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    console.log("\n✅ Staff account saved!");
    console.log("=".repeat(60));
    console.log("  LOGIN DETAILS (save these!)");
    console.log("=".repeat(60));
    console.log("  Phone:    " + phone);
    console.log("  Password: " + password);
    console.log("  Email:    " + email);
    console.log("=".repeat(60));
    console.log("\nYou can now log in at the Parent Portal section of your website.");
    console.log("Because your email matches STAFF_EMAILS, you'll get admin access automatically.");
    console.log("\nTo create PARENT accounts for students, log in → Admin Dashboard → Add Student.");
  } catch (err) {
    console.error("\n❌ Failed to connect to MongoDB:");
    console.error("   " + err.message);
    console.error("");
    console.error("   Check your DATABASE_URL in .env is correct and your IP is whitelisted in MongoDB Atlas.");
    process.exit(1);
  } finally {
    await client.close();
    rl.close();
  }
})();
