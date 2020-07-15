SELECT
	{{ columnNames }}
FROM
	{{ userTableName }}
JOIN
	{{ tableName }}
		ON {{ userTableName }}.{{ columnName }} = {{ tableName }}.{{ columnName }}
WHERE
	in_library = true AND
	user_id = {{ userId }}
ORDER BY
	{{ userTableName }}.date_added DESC;
