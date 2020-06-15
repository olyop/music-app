CREATE TABLE IF NOT EXISTS users (
	user_id uuid,
	name text NOT NULL,
	current uuid,
	email text NOT NULL,
  date_joined integer NOT NULL DEFAULT date_part('epoch', now()),
	CONSTRAINT users_pk
		PRIMARY KEY (user_id),
	CONSTRAINT users_fk_current
		FOREIGN KEY (current)
		REFERENCES songs (song_id) MATCH FULL
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT users_check_date_joined
		CHECK (date_joined >= 1)
);
