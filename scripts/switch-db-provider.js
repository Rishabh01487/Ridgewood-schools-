#!/usr/bin/env node
/**
 * Switch Prisma provider based on the DATABASE_URL scheme.
 *
 * - If DATABASE_URL starts with "file:" → SQLite (local dev)
 * - If DATABASE_URL starts with "postgresql:" or "postgres:" → PostgreSQL (Vercel prod)
 * - If DATABASE_URL starts with "mysql:" → MySQL
 *
 * This script rewrites prisma/schema.prisma's datasource.provider field
 * so the right Prisma client is generated for the environment.
 *
 * On Vercel, set DATABASE_URL to a Vercel Postgres connection string and
 * this script will switch the provider to "postgresql" before `prisma generate`
 * runs during the build.
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
schema = schema.replace(
  /datasource db \{\s*provider\s*=\s*"[a-z]+"\s*\n\s*url\s*=\s*env\("DATABASE_URL"\)\s*\n\s*\}/,
  `datasource db {\n  provider = "${provider}"\n  url      = env("DATABASE_URL")\n}`
);
fs.writeFileSync(schemaPath, schema);
console.log(`[switch-db-provider] Updated prisma/schema.prisma to use provider="${provider}"`);
