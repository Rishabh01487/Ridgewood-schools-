import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { collections } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  pages: { signIn: "/#parent-login", error: "/#parent-login" },
  providers: [
    CredentialsProvider({
      name: "Parent Login",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const rawPhone = (credentials.phone || "").replace(/\D/g, "").slice(-10);
        const password = credentials.password || "";
        if (!/^\d{10}$/.test(rawPhone) || !password) return null;
        if (password.length > 200) return null;

        try {
          const col = await collections.parents();
          const parent = await col.findOne({ phone: rawPhone });
          const dummyHash = "$2a$10$CwTycUXWue0ThqfSt4UMWeK3eqY8m8m8m8m8m8m8m8m8m8m8m8m8m";
          const hashToCompare = parent?.passwordHash || dummyHash;
          const valid = await bcrypt.compare(password, hashToCompare);
          if (!parent || !valid) return null;

          return {
            id: String(parent._id),
            name: parent.name,
            email: parent.email || undefined,
          } as any;
        } catch (err) {
          console.error("[auth] Error:", err);
          return null;
        }
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
