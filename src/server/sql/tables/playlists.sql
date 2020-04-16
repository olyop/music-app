CREATE TABLE IF NOT EXISTS public.playlists (
  playlist_id uuid NOT NULL,
  name text COLLATE pg_catalog."default" NOT NULL,
  user_id uuid NOT NULL,
  date_created integer NOT NULL,
  CONSTRAINT playlists_pk
    PRIMARY KEY (playlist_id),
  CONSTRAINT playlists_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH FULL
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  CONSTRAINT playlists_check_date_created
    CHECK (date_created >= 1)
);
