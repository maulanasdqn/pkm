ALTER TABLE "app_visitors" ADD COLUMN "date" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "app_visitors" DROP COLUMN IF EXISTS "month";