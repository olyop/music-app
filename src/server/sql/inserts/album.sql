INSERT INTO albums
  (album_id, title, released)
VALUES
  (:album_id, :title, :released)
RETURNING
  album_id, title, released;
