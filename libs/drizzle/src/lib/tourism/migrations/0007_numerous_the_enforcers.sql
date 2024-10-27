CREATE TABLE IF NOT EXISTS "app_visitors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"month" text NOT NULL,
	"desktop" integer NOT NULL,
	"mobile" integer NOT NULL
);
