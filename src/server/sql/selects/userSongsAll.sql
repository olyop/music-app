SELECT
	*
FROM
	users_songs
JOIN
	songs
		ON users_songs.song_id = songs.song_id
WHERE
	in_library = true AND
	user_id = {{ userId }};