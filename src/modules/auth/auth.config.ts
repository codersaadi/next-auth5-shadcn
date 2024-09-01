import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { LoginSchema } from "./auth.schema";
import userRepository from "./data/user";
export default {
 trustHost : true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validate = await LoginSchema.parseAsync(credentials);
        if (!validate) return null;
        const { email, password } = validate;
        const user = await userRepository.getUserByEmail(email);
        if (!user || !user.password) return null;
        const matched = await bcrypt.compare(password, user.password);
        if (matched) return user;
        return user;
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    
    
    
  ],
} satisfies NextAuthConfig;

const providersUsed = ["credentials", "github", "google", "facebook"] as const;
export type availableProviders = (typeof providersUsed)[number];
