CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"subtitle" text,
	"description" text,
	"tags" text[],
	"images" text[],
	"contactInfo" text,
	"clicks" integer DEFAULT 0,
	"userId" uuid,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text,
	"profileImage" text,
	"tagline" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
