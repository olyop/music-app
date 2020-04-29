SELECT EXISTS
  (
    SELECT
      *
    FROM
      users_albums
    WHERE
      user_id = {{ userId }}
      album_id = {{ albumId }}
  );
