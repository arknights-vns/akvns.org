/*
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'comic_chapter'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually

    Hope to release this update as soon as possible
*/

ALTER TABLE "comic_chapter" DROP CONSTRAINT "comic_chapter_pkey";--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "comicChapterId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "comic_chapter" ADD COLUMN "id" integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY (sequence name "comic_chapter_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);
