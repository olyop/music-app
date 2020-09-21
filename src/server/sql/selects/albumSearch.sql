SELECT
	{{ columnNames }},
	ts_rank_cd(search_vector, plainto_tsquery({{ query }})) as rank
FROM
	albums
WHERE
	search_vector @@ plainto_tsquery({{ query }})