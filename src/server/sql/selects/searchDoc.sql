SELECT
	{{ columnNames }},
	ts_rank_cd({{ columnName }}_vector, plainto_tsquery({{ query }})) as rank
FROM
	{{ tableName }}
WHERE
	{{ columnName }}_vector @@ plainto_tsquery({{ query }});