INSERT INTO {{ tableName }}
	(
		user_id,
		song_id,
		index
	)
VALUES
	(
		{{ userId }},
		{{ songId }},
		{{ index }}
	);