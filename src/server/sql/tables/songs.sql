CREATE TABLE IF NOT EXISTS songs (
	key uuid,
	bpm smallint,
	song_id uuid,
	mix text NOT NULL,
	title text NOT NULL,
	album_id uuid NOT NULL,
	duration smallint NOT NULL,
	disc_number smallint NOT NULL,
	track_number smallint NOT NULL,
	title_vector tsvector NOT NULL,
	CONSTRAINT songs_pk
		PRIMARY KEY (song_id),
	CONSTRAINT songs_fk_album_id
		FOREIGN KEY (album_id)
		REFERENCES albums (album_id) MATCH FULL
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT songs_check_duration
		CHECK (duration >= 1),
	CONSTRAINT songs_check_disc_number
		CHECK (disc_number >= 1),
	CONSTRAINT songs_check_track_number
		CHECK (track_number >= 1)
);