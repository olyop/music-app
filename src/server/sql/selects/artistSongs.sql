SELECT DISTINCT
  b.song_id,
  b.title,
  b.mix,
  b.duration,
  b.disc_number,
  b.track_number
FROM
  (SELECT
    song_id
  FROM
    songs_artists
  WHERE
    artist_id = {{ artistId }}
  UNION
  SELECT
    song_id
  FROM
    songs_remixers
  WHERE
    artist_id = {{ artistId }}
  UNION
  SELECT
    song_id
  FROM
    songs_featurings
  WHERE
    artist_id = {{ artistId }}) AS a
JOIN
  songs AS b ON
    a.song_id = b.song_id
ORDER BY
  b.track_number ASC;
