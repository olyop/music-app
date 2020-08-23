CREATE TABLE IF NOT EXISTS plays (
  play_id uuid,
  user_id uuid NOT NULL,
  song_id uuid NOT NULL,
  date_created timestamp with time zone NOT NULL DEFAULT current_timestamp,
  CONSTRAINT plays_pk
    PRIMARY KEY (play_id),
  CONSTRAINT plays_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT plays_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT plays_check_date_created
    CHECK (date_created <= current_timestamp)
);