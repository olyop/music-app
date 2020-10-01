INSERT INTO albums (
	title,
	album_id,
	released,
	title_vector
) VALUES (
	{{ title }},
	{{ albumId }},
	{{ released }},
	to_tsvector({{ title }})
) RETURNING
	{{ columnNames }};