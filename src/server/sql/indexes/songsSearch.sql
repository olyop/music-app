CREATE INDEX IF NOT EXISTS
	songs_search_index
ON
	songs
USING
	gin(search_vector)
		TABLESPACE pg_default;