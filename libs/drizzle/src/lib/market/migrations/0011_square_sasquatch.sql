DO $$ BEGIN
 CREATE TYPE "public"."visitors" AS ENUM('buyer', 'passenger');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_visitors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp NOT NULL,
	"type" "visitors" NOT NULL
);
