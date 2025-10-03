import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema/index";

const connectionString = `${process.env.POSTGRES_URL}`

export const db = drizzle(connectionString, { schema });