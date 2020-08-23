CREATE TABLE IF NOT EXISTS users_songs (
  user_id uuid,
  song_id uuid,
  in_library boolean NOT NULL,
  date_added timestamp with time zone NOT NULL DEFAULT current_timestamp,
  CONSTRAINT users_songs_pk
    PRIMARY KEY (user_id, song_id),
  CONSTRAINT users_songs_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_songs_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_songs_check_fk_date_added
    CHECK (date_added <= current_timestamp)
);
