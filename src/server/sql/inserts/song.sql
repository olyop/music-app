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
    '{{ songId }}',
    '{{ mix }}',
    '{{ title }}',
    {{ duration }},
    '{{ albumId }}',
    {{ discNumber }},
    {{ trackNumber }}
  )
RETURNING
  song_id,
  mix,
  title,
  duration,
  album_id,
  disc_number,
  track_number;
