CREATE TABLE IF NOT EXISTS users_prevs (
  user_prev_id uuid NOT NULL,
  user_id uuid NOT NULL,
  song_id uuid NOT NULL,
  song_index smallint NOT NULL,
  CONSTRAINT users_prevs_pk
    PRIMARY KEY (user_prev_id),
  CONSTRAINT users_prevs_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_prevs_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_prevs_check_song_index
    CHECK (song_index >= 0)
);
