INSERT INTO albums
  (
    album_id,
    title,
    released
  )
VALUES
  (
    {{ albumId }},
    {{ title }},
    {{ released }}
  )
RETURNING
  {{ columnNames }};
