import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title"),
    subtitle: text("subtitle"),
    description: text("description"),
    tags: text("tags").array(),
    images: text("images").array(),
    contact_info: text("contactInfo"),
    clicks: integer("clicks").default(0),
    user_id: uuid("userId"),
    created_at: timestamp("createdAt").defaultNow(),
    updated_at: timestamp("updatedAt"),
})
