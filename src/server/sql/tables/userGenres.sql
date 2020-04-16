CREATE TABLE IF NOT EXISTS public.users_genres (
  user_genre_id uuid NOT NULL,
  user_id uuid NOT NULL,
  genre_id uuid,
  in_library boolean NOT NULL,
  date_created integer NOT NULL,
  CONSTRAINT users_genres_pkey
    PRIMARY KEY (user_genre_id),
  CONSTRAINT users_genres_fk_genre_id
    FOREIGN KEY (genre_id)
    REFERENCES public.genres (genre_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_genres_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_genres_check_date_created
    CHECK (date_created >= 1)
);
