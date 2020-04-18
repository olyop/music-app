INSERT INTO genres
  (genre_id, name)
VALUES
  (:genre_id, :name)
RETURNING
  genre_id, name;
