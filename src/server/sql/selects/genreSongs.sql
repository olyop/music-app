SELECT
  {{ columnNames }}
FROM
  songs_genres
JOIN
  songs
  ON
    songs_genres.song_id = songs.song_id
WHERE
  songs_genres.genre_id = {{ genreId }}
ORDER BY
  title ASC;
