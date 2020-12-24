INSERT INTO users (
	name,
	email,
	user_id,
	password
) VALUES (
	{{ name }},
	{{ email }},
	{{ userId }},
	{{ password }}
) RETURNING
	{{ columnNames }};