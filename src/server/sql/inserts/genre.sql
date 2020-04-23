INSERT INTO genres
  (
    genre_id,
    name
  )
VALUES
  (
    '{{ genreId }}',
    '{{ name }}'
  )
RETURNING
  genre_id, name;
