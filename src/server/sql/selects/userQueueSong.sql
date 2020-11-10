SELECT
	{{ columnNames }}
FROM
	{{ tableName }}
WHERE
	index = {{ index }} AND
	user_id = {{ userId }}
ORDER BY
	index ASC;