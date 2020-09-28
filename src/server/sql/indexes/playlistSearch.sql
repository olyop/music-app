CREATE INDEX IF NOT EXISTS
	playlists_search_index
ON
	playlists
USING
	gin(title_vector);