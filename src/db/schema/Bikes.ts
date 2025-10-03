import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";

export const bikes = pgTable("bikes", {
    id: integer("id").primaryKey().unique(),
    description: text("description"),
    bike_image: text("bike_image_url"),
    dropoff_location: text("dropoff_location"),
    dropoff_image: text("dropoff_image_url"),
    reserved: boolean("reserved").default(false),
    donation_status: text("donation_status").default("incomplete")
})