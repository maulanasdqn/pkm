ALTER TABLE "app_reservations" DROP CONSTRAINT "app_reservations_id_app_destinations_id_fk";
--> statement-breakpoint
ALTER TABLE "app_reservations" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "app_reservations" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "app_reservations" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_reservations" ADD COLUMN "destination_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_reservations" ADD CONSTRAINT "app_reservations_destination_id_app_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."app_destinations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
