import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema/index";

const client = postgres(process.env.POSTGRES_URL!, {
  prepare: false,
  max: 1,
});

export const db = drizzle(client, { schema });
