ALTER TABLE "app_visitors" ALTER COLUMN "date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "app_visitors" ALTER COLUMN "date" DROP NOT NULL;