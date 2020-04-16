CREATE TABLE IF NOT EXISTS public.plays (
  play_id uuid NOT NULL,
  user_id uuid NOT NULL,
  song_id uuid NOT NULL,
  date_created integer NOT NULL,
  CONSTRAINT plays_pk
    PRIMARY KEY (play_id),
  CONSTRAINT plays_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES public.songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT plays_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT plays_check_date_created
    CHECK (date_created >= 1)
);
