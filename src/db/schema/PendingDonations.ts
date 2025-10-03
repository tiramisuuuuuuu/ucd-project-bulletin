import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { bikes } from "./Bikes";
import { users } from "./Users";

export const pendingDonations = pgTable("pending_donations", {
    id: uuid("id").defaultRandom().primaryKey(),
    user: uuid("user_id").references(() => users.id),
    bike: uuid("bike_id").references(() => bikes.id)
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