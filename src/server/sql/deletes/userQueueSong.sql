DELETE FROM
	{{ tableName }}
WHERE
	user_id = {{ userId }} AND
	index = {{ index }};