SELECT
  song_id,
  title,
  mix,
  album_id,
  duration,
  disc_number,
  track_number
FROM
  songs
WHERE
  album_id = :album_id
ORDER BY
  title ASC;
