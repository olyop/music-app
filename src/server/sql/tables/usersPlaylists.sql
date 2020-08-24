CREATE TABLE IF NOT EXISTS users_playlists (
  user_id uuid,
  playlist_id uuid,
  in_library boolean NOT NULL,
  date_added bigint NOT NULL DEFAULT cast(extract(epoch from now()) as bigint),
  CONSTRAINT users_playlists_pk
    PRIMARY KEY (user_id, playlist_id),
  CONSTRAINT users_playlists_fk_playlist_id
    FOREIGN KEY (playlist_id)
    REFERENCES playlists (playlist_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_playlists_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_playlists_check_date_added
    CHECK (date_added <= cast(extract(epoch from now()) as bigint))
);