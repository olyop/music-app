CREATE TABLE public.users_artists (
  user_artist_id uuid NOT NULL,
  user_id uuid NOT NULL,
  artist_id uuid NOT NULL,
  in_library boolean NOT NULL,
  date_created integer NOT NULL,
  CONSTRAINT users_artists_pk
    PRIMARY KEY (user_artist_id),
  CONSTRAINT users_artists_fk_artist_id
    FOREIGN KEY (artist_id)
    REFERENCES public.artists (artist_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_artists_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_artists_check_date_created
    CHECK (date_created >= 1)
);
