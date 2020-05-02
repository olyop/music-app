CREATE TABLE IF NOT EXISTS users_genres (
  user_id uuid,
  genre_id uuid,
  in_library boolean NOT NULL,
  date_created integer NOT NULL DEFAULT date_part('epoch', now()),
  CONSTRAINT users_genres_pk
    PRIMARY KEY (user_id, genre_id),
  CONSTRAINT users_genres_fk_genre_id
    FOREIGN KEY (genre_id)
    REFERENCES genres (genre_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_genres_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT users_genres_check_date_created
    CHECK (date_created >= 1)
);
