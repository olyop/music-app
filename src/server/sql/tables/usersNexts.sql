CREATE TABLE IF NOT EXISTS users_nexts (
  user_next_id uuid NOT NULL,
  user_id uuid NOT NULL,
  song_id uuid NOT NULL,
  song_index integer NOT NULL,
  CONSTRAINT users_nexts_pk
    PRIMARY KEY (user_next_id),
  CONSTRAINT users_nexts_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_nexts_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_nexts_check_song_index
    CHECK (song_index >= 0)
);
