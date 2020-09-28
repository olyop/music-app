CREATE INDEX IF NOT EXISTS
	genres_search_index
ON
	genres
USING
	gin(name_vector);