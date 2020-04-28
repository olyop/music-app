SELECT
  b.song_id,
  b.title,
  b.mix,
  b.duration,
  b.disc_number,
  b.track_number
FROM
  songs_genres AS a
JOIN
  songs AS b
  ON
    a.song_id = b.song_id
WHERE
  a.genre_id = {{ genreId }}
ORDER BY
  index ASC;
