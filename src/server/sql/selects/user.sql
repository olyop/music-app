SELECT
	{{ columnNames }}
FROM
	users
WHERE
	user_id = {{ userId }}
LIMIT
	1;