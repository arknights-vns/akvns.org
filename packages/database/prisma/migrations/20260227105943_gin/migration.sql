ALTER TABLE "comic_series" ADD COLUMN "search_text" TEXT GENERATED ALWAYS AS (
  series_id || ' ' || title || ' ' || author
) STORED;;

CREATE INDEX comic_series_search_trgm_idx
ON "comic_series"
USING gin (search_text gin_trgm_ops);
