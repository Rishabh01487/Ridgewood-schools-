import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

/**
 * Ridgewood School — NextAuth configuration
 *
 * Security notes:
 * - Credentials provider: phone (10-digit) + password
 * - Passwords are bcrypt-hashed (10 rounds) in the DB
 * - JWT sessions signed with NEXTAUTH_SECRET
 * - Phone numbers are normalised (digits only, last 10 chars) before lookup
 * - Failed auth returns null (no user enumeration via timing in this layer;
 *   bcrypt.compare is constant-time)
 * - Email is included in the JWT so /api/upload can check staff allowlist
 */

const PHONE_RE = /^\d{10}$/;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Short-lived sessions for school portal
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/#parent-login",
    error: "/#parent-login",
  },
  providers: [
    CredentialsProvider({
      name: "Parent Login",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        // Normalise phone — keep only digits, take last 10
        const rawPhone = (credentials.phone || "").replace(/\D/g, "").slice(-10);
        const password = credentials.password || "";
        if (!PHONE_RE.test(rawPhone) || !password) return null;
        if (password.length > 200) return null; // pre-empt DoS on huge passwords

        const parent = await db.parent.findUnique({
          where: { phone: rawPhone },
        });
        // Always run bcrypt.compare (even if parent not found) to reduce timing oracle.
        // For non-existent user, compare against a pre-computed hash so the function still takes time.
        const dummyHash = "$2a$10$CwTycUXWue0ThqfSt4UMWeK3eqY8m8m8m8m8m8m8m8m8m8m8m8m8m";
        const hashToCompare = parent?.passwordHash || dummyHash;
        const valid = await bcrypt.compare(password, hashToCompare);
        if (!parent || !valid) return null;

        return {
          id: parent.id,
          name: parent.name,
          email: parent.email || undefined,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.parentId = user.id;
        token.email = (user as any).email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).parentId = token.parentId;
        (session.user as any).email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "ridgewood-dev-secret-change-in-prod",
  debug: false,
};
