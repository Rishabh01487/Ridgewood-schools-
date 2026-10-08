/**
 * No provider switching needed — we use MongoDB for both dev and prod.
 * MongoDB connection string format:
 * mongodb+srv://username:password@cluster.mongodb.net/database
 */
console.log("[db] Using MongoDB provider");
console.log("[db] DATABASE_URL scheme:", (process.env.DATABASE_URL || "").split(":")[0] || "(empty)");
