import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { bikes } from "./Bikes";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").unique(),
    reserved_bike: uuid("reserved_bike_id").references(() => bikes.id)
})

export const usersRelations = relations(users, ({ one }) => ({
    reserved_bike: one(bikes, {
        fields: [users.reserved_bike],
        references: [bikes.id],
    })
}));