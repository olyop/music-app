INSERT INTO songs
  (
    mix,
    title,
    song_id,
    album_id,
    duration,
    disc_number,
    track_number
  )
VALUES
  (
    {{ mix }},
    {{ title }},
    {{ songId }},
    {{ albumId }},
    {{ duration }},
    {{ discNumber }},
    {{ trackNumber }}
  )
RETURNING
  mix,
  title,
  song_id,
  album_id,
  duration,
  disc_number,
  track_number;
