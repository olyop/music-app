CREATE TABLE IF NOT EXISTS public.songs_artists (
  song_artist_id uuid NOT NULL,
  song_id uuid NOT NULL,
  artist_id uuid NOT NULL,
  artist_index smallint NOT NULL,
  CONSTRAINT songs_artists_pkey
    PRIMARY KEY (song_artist_id),
  CONSTRAINT songs_artists_fk_artist_id
    FOREIGN KEY (artist_id)
    REFERENCES public.artists (artist_id) MATCH FULL
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  CONSTRAINT songs_artists_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES public.songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT songs_artists_check_artist_index
    CHECK (artist_index >= 0)
);
