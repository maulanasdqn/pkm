ALTER TABLE "app_cart_items" ADD COLUMN "order_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_cart_items" ADD CONSTRAINT "app_cart_items_order_id_app_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."app_orders"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
