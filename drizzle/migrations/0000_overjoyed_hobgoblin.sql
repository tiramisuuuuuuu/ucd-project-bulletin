CREATE TABLE "bikes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text,
	"bike_image_url" text,
	"dropoff_location" text,
	"dropoff_image_url" text,
	"reserved" boolean DEFAULT false,
	"donation_status" text DEFAULT 'incomplete'
);
--> statement-breakpoint
CREATE TABLE "pending_donations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"bike_id" uuid
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"reserved_bike_id" uuid,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "pending_donations" ADD CONSTRAINT "pending_donations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pending_donations" ADD CONSTRAINT "pending_donations_bike_id_bikes_id_fk" FOREIGN KEY ("bike_id") REFERENCES "public"."bikes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_reserved_bike_id_bikes_id_fk" FOREIGN KEY ("reserved_bike_id") REFERENCES "public"."bikes"("id") ON DELETE no action ON UPDATE no action;