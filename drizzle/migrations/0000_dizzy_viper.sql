CREATE TABLE "bikes" (
	"id" integer PRIMARY KEY NOT NULL,
	"description" text,
	"bike_image_url" text,
	"dropoff_location" text,
	"dropoff_image_url" text,
	"reserved" boolean DEFAULT false,
	"donation_status" text DEFAULT 'incomplete',
	CONSTRAINT "bikes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "pending_donations" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer,
	"bike_id" integer,
	CONSTRAINT "pending_donations_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"reserved_bike_id" integer,
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "pending_donations" ADD CONSTRAINT "pending_donations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pending_donations" ADD CONSTRAINT "pending_donations_bike_id_bikes_id_fk" FOREIGN KEY ("bike_id") REFERENCES "public"."bikes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_reserved_bike_id_bikes_id_fk" FOREIGN KEY ("reserved_bike_id") REFERENCES "public"."bikes"("id") ON DELETE no action ON UPDATE no action;