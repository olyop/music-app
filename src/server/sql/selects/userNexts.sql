SELECT
	{{ columnNames }}
FROM
	users_nexts
WHERE
	user_id = {{ userId }}
ORDER BY
	index ASC;