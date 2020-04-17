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
  song_id = :song_id;
