CREATE TABLE IF NOT EXISTS users_laters (
  user_id uuid,
  song_id uuid,
  index smallint,
  CONSTRAINT users_laters_pk
    PRIMARY KEY (user_id, song_id, index),
  CONSTRAINT users_laters_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_laters_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_laters_check_index
    CHECK (index >= 0)
);