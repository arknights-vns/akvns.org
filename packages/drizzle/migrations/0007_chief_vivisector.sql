ALTER TABLE "account" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "session" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "verification" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "blog" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "project" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "account" CASCADE;--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
DROP TABLE "user" CASCADE;--> statement-breakpoint
DROP TABLE "verification" CASCADE;--> statement-breakpoint
DROP TABLE "blog" CASCADE;--> statement-breakpoint
DROP TABLE "project" CASCADE;--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "updatedAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "updatedAt" SET NOT NULL;--> statement-breakpoint
DROP TYPE "public"."project_type";