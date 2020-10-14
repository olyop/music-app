SELECT
	{{ columnNames }}
FROM
	songs
WHERE
	song_id = {{ songId }}
LIMIT
	1;