INSERT INTO artists
  (
    name,
    artist_id
  )
VALUES
  (
    {{ name }},
    {{ artistId }}
  )
RETURNING
  {{ columnNames }};