SELECT
  {{ columnNames }}
FROM
  songs_featurings
JOIN
  artists
    ON songs_featurings.artist_id = artists.artist_id
WHERE
  song_id = {{ songId }}
ORDER BY
  index ASC;
