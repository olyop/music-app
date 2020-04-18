INSERT INTO songs
  (
    song_id,
    mix,
    title,
    duration,
    album_id,
    disc_number,
    track_number
  )
VALUES
  (
    :song_id,
    :mix,
    :title,
    :duration,
    :album_id,
    :disc_number,
    :track_number
  )
RETURNING
  song_id,
  mix,
  title,
  duration,
  album_id,
  disc_number,
  track_number;
