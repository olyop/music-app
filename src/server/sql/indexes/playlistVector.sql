CREATE INDEX IF NOT EXISTS
	playlists_vector_index
ON
	playlists
USING
	gin(title_vector);