SELECT
  {{ columnNames }}
FROM
  albums
WHERE
  album_id = {{ albumId }}
LIMIT
  1;