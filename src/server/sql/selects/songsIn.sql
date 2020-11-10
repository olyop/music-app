SELECT
	{{ columnNames }}
FROM
	songs
WHERE
	song_id in({{ songIds }});