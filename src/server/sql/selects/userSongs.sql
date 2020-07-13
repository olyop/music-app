SELECT
	{{ columnNames }}
FROM
	users_songs
JOIN
	songs
		ON users_songs.song_id = songs.song_id
WHERE
	user_id = {{ userId }}
ORDER BY
	users_songs.date_added DESC;
