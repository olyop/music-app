CREATE INDEX IF NOT EXISTS
	songs_vector_index
ON
	songs
USING
	gin(title_vector);