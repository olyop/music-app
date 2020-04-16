CREATE TABLE IF NOT EXISTS public.genres (
  genre_id uuid NOT NULL,
  name text NOT NULL,
  CONSTRAINT genres_pk
    PRIMARY KEY (genre_id)
);
