CREATE TYPE "public"."comic_category" AS ENUM('Arknights_VNS', 'Partner', 'Collaboration', 'Community');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('Community', 'Event', 'Cross_Over');--> statement-breakpoint
CREATE TABLE "account" (
	"id" uuid PRIMARY KEY DEFAULT pg_catalog.gen_random_uuid() NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" uuid PRIMARY KEY DEFAULT pg_catalog.gen_random_uuid() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" uuid NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT pg_catalog.gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" uuid PRIMARY KEY DEFAULT pg_catalog.gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255),
	"title" varchar(255) NOT NULL,
	"author" varchar(255),
	"shortBriefing" text,
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "blog_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "comic_chapter" (
	"comicChapterId" varchar(255) PRIMARY KEY NOT NULL,
	"chapterName" text NOT NULL,
	"comicSeriesId" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "comic_contributor" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comic_contributor_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"comicSeriesId" varchar(255) NOT NULL,
	"role" text NOT NULL,
	"members" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comic_series" (
	"comicSeriesId" varchar(255) PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"synopsis" text NOT NULL,
	"author" text NOT NULL,
	"thumbnail" text NOT NULL,
	"category" "comic_category" NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"likeCount" integer DEFAULT 0,
	"viewCount" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"type" "project_type" DEFAULT 'Event' NOT NULL,
	"mainImg" text,
	"date" timestamp DEFAULT now(),
	"description" text,
	"blog_id" integer,
	CONSTRAINT "project_blog_id_unique" UNIQUE("blog_id")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comic_chapter" ADD CONSTRAINT "comic_chapter_comicSeriesId_comic_series_comicSeriesId_fk" FOREIGN KEY ("comicSeriesId") REFERENCES "public"."comic_series"("comicSeriesId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "comic_contributor" ADD CONSTRAINT "comic_contributor_comicSeriesId_comic_series_comicSeriesId_fk" FOREIGN KEY ("comicSeriesId") REFERENCES "public"."comic_series"("comicSeriesId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_blog_id_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "blog_idx" ON "blog" USING btree ("title","slug","shortBriefing","author");--> statement-breakpoint
CREATE INDEX "comic_chapter_idx" ON "comic_chapter" USING btree ("comicChapterId","chapterName","comicSeriesId");--> statement-breakpoint
CREATE UNIQUE INDEX "comic_contributor_role_series_unique" ON "comic_contributor" USING btree ("role","comicSeriesId");--> statement-breakpoint
CREATE INDEX "comic_series_idx" ON "comic_series" USING btree ("title","author");--> statement-breakpoint
CREATE INDEX "project_idx" ON "project" USING btree ("title","type","date");