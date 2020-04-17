CREATE TABLE IF NOT EXISTS songs_genres (
  song_genre_id uuid NOT NULL,
  song_id uuid NOT NULL,
  genre_id uuid NOT NULL,
  genre_index smallint NOT NULL,
  CONSTRAINT songs_genres_pk
    PRIMARY KEY (song_genre_id),
  CONSTRAINT songs_genres_fk_genre_id
    FOREIGN KEY (genre_id)
    REFERENCES genres (genre_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT songs_genres_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT songs_genres_check_artist_index
    CHECK (artist_index >= 0)
);
