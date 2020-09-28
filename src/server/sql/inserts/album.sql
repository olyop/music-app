INSERT INTO albums
	(
		title,
		album_id,
		released,
		title_vector
	)
VALUES
	(
		{{ title }},
		{{ albumId }},
		{{ released }}

	)
RETURNING
	{{ columnNames }};