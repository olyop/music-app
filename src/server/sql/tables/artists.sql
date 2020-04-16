CREATE TABLE IF NOT EXISTS public.artists (
  artist_id uuid NOT NULL,
  name text NOT NULL,
  CONSTRAINT artists_pk
    PRIMARY KEY (artist_id)
);
