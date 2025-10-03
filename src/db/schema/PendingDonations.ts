import { relations } from "drizzle-orm";
import { integer, pgTable } from "drizzle-orm/pg-core";
import { bikes } from "./Bikes";
import { users } from "./Users";

export const pendingDonations = pgTable("pending_donations", {
    id: integer("id").primaryKey().unique(),
    user: integer("user_id").references(() => users.id),
    bike: integer("bike_id").references(() => bikes.id)
})

export const pendingDonationsRelations = relations(pendingDonations, ({ one }) => ({
    user: one(users, {
        fields: [pendingDonations.user],
        references: [users.id],
    }),
    bikes: one(users, {
        fields: [pendingDonations.user],
        references: [users.id],
    })
}));