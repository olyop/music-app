CREATE TABLE IF NOT EXISTS users_albums (
  user_id uuid,
  album_id uuid,
  in_library boolean NOT NULL,
  date_added bigint NOT NULL DEFAULT cast(extract(epoch from now()) as bigint),
  CONSTRAINT users_albums_pk
    PRIMARY KEY (user_id, album_id),
  CONSTRAINT users_albums_fk_album_id
    FOREIGN KEY (album_id)
    REFERENCES albums (album_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_albums_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_albums_check_date_added
    CHECK (date_added <= cast(extract(epoch from now()) as bigint))
);