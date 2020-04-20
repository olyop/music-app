CREATE TABLE IF NOT EXISTS albums (
  album_id uuid,
  title text NOT NULL,
  released integer NOT NULL,
  CONSTRAINT albums_pk
    PRIMARY KEY (album_id),
  CONSTRAINT albums_check_released
    CHECK (released >= 0)
);
