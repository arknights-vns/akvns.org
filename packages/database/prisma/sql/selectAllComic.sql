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
  similarity(search_text, $1) AS score
FROM "comic_series"
WHERE (
  $1 = ''
  OR search_text % $1
  OR search_text ILIKE '%' || $1 || '%'
  OR (
    -- anytime until EXPLAIN tells me "you are a fucking idiot".
    length($1) <= 10
    AND search_text ~* regexp_replace($1, '(.)', '\1.*', 'g')
  )
)
ORDER BY score DESC
OFFSET greatest(($2 - 1) * COALESCE($3, 15), 0)
LIMIT greatest(COALESCE($3, 15), 15);

-- dear whoever seeing this,
-- I'm sorry for letting you witness this abomination of a raw query.
