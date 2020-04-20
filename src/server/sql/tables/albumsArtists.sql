CREATE TABLE IF NOT EXISTS albums_artists (
  album_artist_id uuid,
  album_id uuid NOT NULL,
  artist_id uuid NOT NULL,
  artist_index smallint NOT NULL,
  CONSTRAINT albums_artists_pk
    PRIMARY KEY (album_artist_id),
  CONSTRAINT albums_artists_fk_album_id
    FOREIGN KEY (album_id)
    REFERENCES albums (album_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT albums_artists_fk_artist_id
    FOREIGN KEY (artist_id)
    REFERENCES artists (artist_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT albums_artists_check_artist_index
    CHECK (artist_index >= 0)
);
