CREATE TABLE IF NOT EXISTS users (
	user_id uuid,
	name text NOT NULL,
	email text NOT NULL,
	current uuid DEFAULT NULL,
  date_joined timestamp with time zone NOT NULL DEFAULT current_timestamp,
	CONSTRAINT users_pk
		PRIMARY KEY (user_id),
	CONSTRAINT users_fk_current
		FOREIGN KEY (current)
		REFERENCES songs (song_id) MATCH FULL
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT users_check_date_joined
		CHECK (date_joined <= current_timestamp)
);