CREATE TABLE IF NOT EXISTS public.users_albums (
  user_album_id uuid NOT NULL,
  user_id uuid NOT NULL,
  album_id uuid NOT NULL,
  in_library boolean NOT NULL,
  date_created integer NOT NULL,
  CONSTRAINT user_albums_pk
    PRIMARY KEY (user_album_id),
  CONSTRAINT user_albums_fk_album_id
    FOREIGN KEY (album_id)
    REFERENCES public.albums (album_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT user_albums_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT user_albums_check_date_created
    CHECK (date_created >= 1)
);
