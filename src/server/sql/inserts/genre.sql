INSERT INTO genres (
	name,
	genre_id
) VALUES (
	{{ name }},
	{{ genreId }}
) RETURNING
	{{ columnNames }};