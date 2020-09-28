CREATE INDEX IF NOT EXISTS
	songs_search_index
ON
	songs
USING
	gin(title_vector);