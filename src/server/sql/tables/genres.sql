CREATE TABLE IF NOT EXISTS genres (
  genre_id uuid NOT NULL,
  name text NOT NULL,
  CONSTRAINT genres_pk
    PRIMARY KEY (genre_id)
);
