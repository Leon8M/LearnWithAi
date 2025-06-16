ALTER TABLE "courses" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "bannerImageUrl" varchar DEFAULT '';