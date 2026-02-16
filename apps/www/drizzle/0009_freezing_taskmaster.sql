CREATE INDEX "comic_series_id_idx" ON "comic_series" USING btree ("id");--> statement-breakpoint
CREATE INDEX "comic_series_seriesId_idx" ON "comic_series" USING btree ("comicSeriesId");--> statement-breakpoint
CREATE INDEX "comic_title_search_idx" ON "comic_series" USING gin ((
        setweight(to_tsvector('simple', "title"), 'A') ||
        setweight(to_tsvector('simple', "author"), 'B') ||
        setweight(to_tsvector('simple', "synopsis"), 'C') ||
        setweight(to_tsvector('simple', "comicSeriesId"), 'D')
      ));