SELECT
	{{ columnNames }}
FROM
	{{ tableName }}
WHERE
	user_id = {{ userId }}
ORDER BY
	index ASC;