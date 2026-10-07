/**
 * Switch Prisma provider based on the DATABASE_URL scheme.
 *
 * - If DATABASE_URL starts with "file:" → SQLite (local dev)
 * - If DATABASE_URL starts with "postgresql:" or "postgres:" → PostgreSQL (Vercel prod)
 * - If DATABASE_URL starts with "mysql:" → MySQL
 *
 * On Vercel, set DATABASE_URL to a Vercel Postgres connection string and
 * this script will switch the provider to "postgresql" before `prisma generate`
 * runs during the build.
 *
 * If DATABASE_URL is not set at all, defaults to sqlite (for initial build
 * when DB hasn't been configured yet).
 */
const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");
const dbUrl = process.env.DATABASE_URL || "";

let provider = "sqlite";
if (dbUrl.startsWith("postgresql:") || dbUrl.startsWith("postgres:")) {
  provider = "postgresql";
} else if (dbUrl.startsWith("mysql:")) {
  provider = "mysql";
}

console.log(`[switch-db-provider] DATABASE_URL scheme: ${dbUrl.split(":")[0] || "(empty)"} → provider: ${provider}`);

let schema = fs.readFileSync(schemaPath, "utf8");

// Only rewrite if the current provider is different
const currentProviderMatch = schema.match(/provider\s*=\s*"([a-z]+)"/);
const currentProvider = currentProviderMatch ? currentProviderMatch[1] : "";

if (currentProvider === provider) {
  console.log(`[switch-db-provider] Provider already "${provider}", no change needed.`);
  process.exit(0);
}

schema = schema.replace(
  /datasource db \{\s*provider\s*=\s*"[a-z]+"\s*\n\s*url\s*=\s*env\("DATABASE_URL"\)\s*\n\s*\}/,
  `datasource db {\n  provider = "${provider}"\n  url      = env("DATABASE_URL")\n}`
);
fs.writeFileSync(schemaPath, schema);
console.log(`[switch-db-provider] Updated prisma/schema.prisma to use provider="${provider}"`);
