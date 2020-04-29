SELECT
  user_id,
  album_id,
  in_library,
  date_created
FROM
  users_albums
WHERE
  in_library = TRUE &&
  user_id = {{ user_id }} &&
  album_id = {{ album_id }};
