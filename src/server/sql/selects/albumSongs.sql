SELECT
  song_id,
  title,
  mix,
  duration,
  disc_number,
  track_number
FROM
  songs
WHERE
  album_id = :album_id;
