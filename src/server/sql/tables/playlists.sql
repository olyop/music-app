CREATE TABLE IF NOT EXISTS playlists (
  playlist_id uuid NOT NULL,
  name text NOT NULL,
  user_id uuid NOT NULL,
  date_created integer NOT NULL,
  CONSTRAINT playlists_pk
    PRIMARY KEY (playlist_id),
  CONSTRAINT playlists_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH FULL
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  CONSTRAINT playlists_check_date_created
    CHECK (date_created >= 1)
);