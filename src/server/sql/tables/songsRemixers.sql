CREATE TABLE IF NOT EXISTS songs_remixers (
  song_remixer_id uuid NOT NULL,
  song_id uuid NOT NULL,
  artist_id uuid NOT NULL,
  artist_index smallint NOT NULL,
  CONSTRAINT songs_remixers_pk
    PRIMARY KEY (song_remixer_id),
  CONSTRAINT songs_remixers_fk_artist_id
    FOREIGN KEY (artist_id)
    REFERENCES artists (artist_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT songs_remixers_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT songs_remixers_check_artist_index
    CHECK (artist_index >= 0)
);
