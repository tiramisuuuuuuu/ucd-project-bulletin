import { sql } from "drizzle-orm";
import { db } from "../db/db.js";

async function main() {
  await db.execute(sql`
    DO
    $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
      LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END
    $$;
  `);
}

main().catch((err) => {
  process.exit(1);
});
