CREATE INDEX IF NOT EXISTS
	artists_search_index
ON
	artists
USING
	gin(name_vector);