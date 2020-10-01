CREATE INDEX IF NOT EXISTS
	albums_vector_index
ON
	albums
USING
	gin(title_vector);