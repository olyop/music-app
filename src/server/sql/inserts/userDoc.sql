INSERT INTO {{ tableName }} (
	user_id,
	{{ columnName }},
	in_library
) VALUES (
	{{ userId }},
	{{ docId }},
	true
);