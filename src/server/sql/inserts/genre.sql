INSERT INTO genres (
	name,
	genre_id,
	name_vector
) VALUES (
	{{ name }},
	{{ genreId }},
	to_tsvector({{ name }})
) RETURNING
	{{ columnNames }};