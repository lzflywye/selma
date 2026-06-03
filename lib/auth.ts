import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth, keycloak } from "better-auth/plugins";
import { keycloakEnv } from "./env";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  rateLimit: {
    storage: "database",
  },
  session: {
    disableSessionRefresh: true,
  },
  plugins: [
    genericOAuth({
      config: [
        keycloak({
          clientId: keycloakEnv.KEYCLOAK_CLIENT_ID,
          clientSecret: keycloakEnv.KEYCLOAK_CLIENT_SECRET,
          issuer: keycloakEnv.KEYCLOAK_ISSUER,
          scopes: ["openid", "profile", "email"],
          pkce: true,
          overrideUserInfo: true,
        }),
      ],
    }),
    nextCookies(),
  ],
});
