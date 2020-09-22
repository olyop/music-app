SELECT
	{{ columnNames }}
FROM
	users_queues
WHERE
	user_id = {{ userId }}
ORDER BY
	index ASC;