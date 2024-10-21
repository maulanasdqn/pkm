ALTER TABLE "app_orders" ADD COLUMN "products" text NOT NULL;--> statement-breakpoint
ALTER TABLE "app_orders" DROP COLUMN IF EXISTS "quantity";