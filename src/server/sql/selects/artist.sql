SELECT
  {{ columnNames }}
FROM
  artists
WHERE
  artist_id = {{ artistId }}
LIMIT
  30
OFFSET
  {{ offset }};
