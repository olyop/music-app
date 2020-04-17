CREATE TABLE IF NOT EXISTS users_playlists (
  user_playlist_id uuid NOT NULL,
  user_id uuid NOT NULL,
  playlist_id uuid,
  in_library boolean NOT NULL,
  date_created integer NOT NULL,
  CONSTRAINT users_playlists_pk
    PRIMARY KEY (user_playlist_id),
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
  CONSTRAINT users_playlists_check_date_created
    CHECK (date_created >= 1)
);
