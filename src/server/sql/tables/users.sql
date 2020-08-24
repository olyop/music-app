CREATE TABLE IF NOT EXISTS users (
	user_id uuid,
	current uuid,
	name text NOT NULL,
	email text NOT NULL,
  date_joined bigint NOT NULL DEFAULT cast(extract(epoch from now()) as bigint),
	CONSTRAINT users_pk
		PRIMARY KEY (user_id),
	CONSTRAINT users_fk_current
		FOREIGN KEY (current)
		REFERENCES songs (song_id) MATCH FULL
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT users_check_date_joined
		CHECK (date_joined <= cast(extract(epoch from now()) as bigint))
);