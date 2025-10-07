import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const bikes = pgTable("bikes", {
    id: uuid("id").defaultRandom().primaryKey(),
    description: text("description"),
    bike_image: text("bike_image_url").array(),
    dropoff_location: text("dropoff_location"),
    dropoff_image: text("dropoff_image_url").array(),
    reserved: boolean("reserved").default(false),
    donation_status: text("donation_status").default("incomplete")
})