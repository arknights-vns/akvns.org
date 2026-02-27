-- @param {String} $1:search
-- @param {Int} $2:page?
-- @param {Int} $3:pageSize?
SELECT
  id,
  series_id,
  title,
  author,
  thumbnail,
  category,
  greatest(
    similarity(series_id, $1),
    similarity(title, $1),
    similarity(author, $1)
  ) as score
FROM "comic_series"
WHERE (
  title = ''
  OR title % $1
  OR author % $1
  OR series_id % $1
)
ORDER BY score DESC
OFFSET (($2 - 1) * COALESCE($3, 15)) LIMIT COALESCE($3, 15);
