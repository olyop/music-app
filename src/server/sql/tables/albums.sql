CREATE TABLE IF NOT EXISTS public.albums (
  album_id uuid NOT NULL,
  title text NOT NULL,
  released integer NOT NULL,
  CONSTRAINT albums_pk
    PRIMARY KEY (album_id),
  CONSTRAINT albums_check_released
    CHECK (released >= 0)
);
