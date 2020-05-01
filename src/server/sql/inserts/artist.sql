INSERT INTO artists
  (
    artist_id,
    name
  )
VALUES
  (
    {{ artistId }},
    {{ name }}
  )
RETURNING
  {{ columnNames }};
