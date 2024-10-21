ALTER TABLE "app_carts" ADD COLUMN "is_paid" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "app_orders" DROP COLUMN IF EXISTS "products";