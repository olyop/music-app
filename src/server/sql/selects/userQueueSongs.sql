SELECT
	{{ columnNames }}
FROM
	{{ tableName }}
JOIN
	songs
		ON {{ tableName }}.song_id = songs.song_id
WHERE
	{{ tableName }}.user_id = {{ userId }}
ORDER BY
	{{ tableName }}.index ASC
LIMIT
	{{ paginationNum }};