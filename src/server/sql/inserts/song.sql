INSERT INTO songs
	(
		mix,
		title,
		song_id,
		album_id,
		duration,
		disc_number,
		track_number,
		title_vector
	)
VALUES
	(
		{{ mix }},
		{{ title }},
		{{ songId }},
		{{ albumId }},
		{{ duration }},
		{{ discNumber }},
		{{ trackNumber }},
		to_tsvector({{ title }})
	)
RETURNING
	{{ columnNames }};