ALTER TABLE "app_cart_items" ADD COLUMN "is_paid" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "app_carts" DROP COLUMN IF EXISTS "is_paid";