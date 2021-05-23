SELECT
  {{ columnNames }}
FROM
  genres
WHERE
  genre_id = {{ genreId }}
LIMIT
  1;
