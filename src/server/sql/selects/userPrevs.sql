SELECT
	{{ columnNames }}
FROM
	users_prevs
WHERE
	user_id = {{ userId }}
ORDER BY
	index ASC;