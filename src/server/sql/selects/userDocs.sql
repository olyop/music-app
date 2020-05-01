SELECT
	{{ columnNames }}
FROM
	{{ userTableName }}
JOIN
	{{ tableName }}
		ON {{ userTableName }}.{{ columnName }} = {{ tableName }}.{{ columnName }}
WHERE
	user_id = {{ userId }}
ORDER BY
	{{ userTableName }}.date_created DESC;
