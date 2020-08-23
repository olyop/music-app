INSERT INTO albums
  (
    title,
    album_id,
    released
  )
VALUES
  (
    {{ title }},
    {{ albumId }},
    {{ released }}
  )
RETURNING
  {{ columnNames }};
