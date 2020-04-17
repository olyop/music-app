INSERT INTO artists
  (artist_id, name)
VALUES
  (:artist_id, :name)
RETURNING
  artist_id, name;
