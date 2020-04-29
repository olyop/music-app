INSERT INTO users_albums
  (
    user_id,
    album_id,
    in_library,
    date_created
  )
VALUES
  (
    {{ userId }},
    {{ albumId }},
    TRUE,
    {{ dateCreated }}
  );
