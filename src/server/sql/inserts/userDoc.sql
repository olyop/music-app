INSERT INTO {{ tableName }}
	(
		user_id,
		{{ columnName }},
		in_library,
		date_added
	)
VALUES
	(
		{{ userId }},
		{{ docId }},
		true,
		{{ dateAdded }}
	);