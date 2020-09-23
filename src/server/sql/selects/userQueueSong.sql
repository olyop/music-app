SELECT
	{{ columnNames }}
FROM
	{{ tableName }}
WHERE
	user_id = {{ userId }} AND
	index = {{ index }};