SELECT
  genre_id,
  name
FROM
  genres
WHERE
  genre_id = {{ genreId }};
