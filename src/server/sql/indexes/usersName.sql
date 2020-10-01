CREATE INDEX IF NOT EXISTS
	users_vector_index
ON
	users
USING
	gin(name_vector);