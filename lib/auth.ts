import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { argon2idHash, argon2idVerify } from "./password";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: argon2idHash,
      verify: argon2idVerify,
    },
  },
  rateLimit: {
    storage: "database",
  },
  plugins: [nextCookies()],
});
