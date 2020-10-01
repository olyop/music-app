SELECT
	{{ columnNames }}
FROM
	{{ tableName }}
WHERE
	{{ columnName }}_vector @@ plainto_tsquery({{ query }})
order by
	ts_rank({{ columnName }}_vector, plainto_tsquery({{ query }}));