CREATE TABLE IF NOT EXISTS "app_destinations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"images" text[] NOT NULL,
	"ticket_price" integer NOT NULL,
	"status" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_informations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"location" varchar NOT NULL,
	"image" text NOT NULL,
	"description" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_reservations" (
	"id" uuid,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone_number" integer NOT NULL,
	"date" timestamp NOT NULL,
	"time" timestamp NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_reservations" ADD CONSTRAINT "app_reservations_id_app_destinations_id_fk" FOREIGN KEY ("id") REFERENCES "public"."app_destinations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
