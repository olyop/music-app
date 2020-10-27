INSERT INTO artists (
	name,
	artist_id,
	name_vector
) VALUES (
	{{ name }},
	{{ artistId }},
	to_tsvector({{ name }})
) RETURNING
	{{ columnNames }};