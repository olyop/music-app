CREATE TABLE IF NOT EXISTS public.users_songs (
  user_song_id uuid NOT NULL,
  user_id uuid NOT NULL,
  song_id uuid NOT NULL,
  in_library boolean NOT NULL,
  date_created integer NOT NULL,
  CONSTRAINT users_songs_pkey
    PRIMARY KEY (user_song_id),
  CONSTRAINT users_songs_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES public.songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_songs_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_songs_check_fk_date_created
    CHECK (date_created >= 1)
);
