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
  album_id = {{ albumId }}
ORDER BY
  title ASC;
