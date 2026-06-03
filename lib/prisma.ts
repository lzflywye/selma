import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { connectionString } from "./env";

const adapter = new PrismaPg({ connectionString, max: 4 });
export const prisma = new PrismaClient({ adapter });
