SELECT
  album_id,
  title,
  released
FROM
  albums
WHERE
  album_id = :album_id;
