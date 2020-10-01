INSERT INTO users (
	name,
	email,
	user_id,
	name_vector
) VALUES (
	{{ name }},
	{{ email }},
	{{ userId }}
	to_tsvector({{ name }})
);