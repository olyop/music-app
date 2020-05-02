CREATE TABLE IF NOT EXISTS users_artists (
  user_id uuid,
  artist_id uuid,
  in_library boolean NOT NULL,
  date_created integer NOT NULL DEFAULT date_part('epoch', now()),
  CONSTRAINT users_artists_pk
    PRIMARY KEY (user_id, artist_id),
  CONSTRAINT users_artists_fk_artist_id
    FOREIGN KEY (artist_id)
    REFERENCES artists (artist_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_artists_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_artists_check_date_created
    CHECK (date_created >= 1)
);
