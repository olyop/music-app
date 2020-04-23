INSERT INTO songs_genres
  (
    song_id,
    genre_id,
    genre_index,
    song_genre_id
  )
VALUES
  (
    '{{ songId }}',
    '{{ genreId }}',
    {{ genreIndex }},
    '{{ songGenreId }}'
  );
