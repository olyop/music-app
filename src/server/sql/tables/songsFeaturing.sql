CREATE TABLE IF NOT EXISTS public.songs_featurings (
  song_featuring_id uuid NOT NULL,
  song_id uuid NOT NULL,
  artist_id uuid NOT NULL,
  artist_index smallint NOT NULL,
  CONSTRAINT songs_featurings_pk
    PRIMARY KEY (song_featuring_id),
  CONSTRAINT songs_featurings_fk_artist_id
    FOREIGN KEY (artist_id)
    REFERENCES public.artists (artist_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT songs_featurings_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES public.songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT songs_featurings_check_artist_index
    CHECK (artist_index >= 0)
);
