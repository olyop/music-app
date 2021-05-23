SELECT
  {{ columnNames }}
FROM
  songs_remixers
JOIN
  artists
    ON songs_remixers.artist_id = artists.artist_id
WHERE
  song_id = {{ songId }}
ORDER BY
  index ASC;
