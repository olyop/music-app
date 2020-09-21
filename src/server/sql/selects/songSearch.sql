SELECT
	{{ columnNames }},
	ts_rank_cd(search_vector, plainto_tsquery({{ query }})) as rank
FROM
	songs
WHERE
	search_vector @@ plainto_tsquery({{ query }});