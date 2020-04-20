CREATE TABLE IF NOT EXISTS users (
	user_id uuid,
	name text NOT NULL,
	current uuid,
	date_created integer NOT NULL,
	CONSTRAINT users_pk
		PRIMARY KEY (user_id),
	CONSTRAINT users_fk_current
		FOREIGN KEY (current)
		REFERENCES songs (song_id) MATCH FULL
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT users_check_date_created
		CHECK (date_created >= 1)
);
