import z from "zod";

const commonSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const dbSchema = z.object({
  PGUSER: z.string(),
  PGPASSWORD: z.string(),
  PGHOST: z.string(),
  PGPORT: z.coerce.number().int().default(5432),
  PGDATABASE: z.string(),
});

const keycloakSchema = z.object({
  KEYCLOAK_CLIENT_ID: z.string(),
  KEYCLOAK_CLIENT_SECRET: z.string(),
  KEYCLOAK_ISSUER: z.string(),
});

function validateEnv<T>(schema: z.Schema<T>, data: unknown, name: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(
      `❌ Invalid ${name} variables:`,
      JSON.stringify(result.error.issues, null, 2),
    );
    throw new Error(`Invalid environment variables in ${name}`);
  }
  return result.data;
}

export const dbEnv = validateEnv(dbSchema, process.env, "Database");
export const nodeEnv = validateEnv(commonSchema, process.env, "Common");
export const keycloakEnv = validateEnv(keycloakSchema, process.env, "Keycloak");

export const connectionString = `postgresql://${dbEnv.PGUSER}:${encodeURIComponent(dbEnv.PGPASSWORD)}@${dbEnv.PGHOST}:${dbEnv.PGPORT}/${dbEnv.PGDATABASE}?schema=public`;
