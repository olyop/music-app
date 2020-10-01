CREATE INDEX IF NOT EXISTS
	artists_vector_index
ON
	artists
USING
	gin(name_vector);