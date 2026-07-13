import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth, keycloak } from "better-auth/plugins";
import { dbEnv, keycloakEnv } from "./env";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    user: dbEnv.PGUSER,
    password: dbEnv.PGPASSWORD,
    host: dbEnv.PGHOST,
    port: dbEnv.PGPORT,
    database: dbEnv.PGDATABASE,
    options: dbEnv.PGOPTIONS,
    max: 3,
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
