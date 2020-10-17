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
	{{ orderByTableName }}.{{ orderByField }} {{ orderByDirection }}
LIMIT
	{{ paginationNum }}
OFFSET
	{{ offset }};