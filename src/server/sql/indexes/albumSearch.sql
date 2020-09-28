CREATE INDEX IF NOT EXISTS
	albums_search_index
ON
	albums
USING
	gin(title_vector);