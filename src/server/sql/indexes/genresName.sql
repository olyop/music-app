CREATE INDEX IF NOT EXISTS
	genres_vector_index
ON
	genres
USING
	gin(name_vector);