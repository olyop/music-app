SELECT
	{{ columnNames }}
FROM
	songs
WHERE
	song_id IN ({{ songIds }});