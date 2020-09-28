CREATE INDEX IF NOT EXISTS
	users_search_index
ON
	users
USING
	gin(name_vector);