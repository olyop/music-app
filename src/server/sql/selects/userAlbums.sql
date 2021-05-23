SELECT
	{{ columnNames }}
FROM
	albums
WHERE
	album_id in(
		SELECT
			songs.album_id
		FROM
			users_songs
		JOIN
			songs
				ON users_songs.song_id = songs.song_id
		WHERE
			in_library = true AND
			user_id = {{ userId }}
	)
ORDER BY
	albums.{{ orderByField }} {{ orderByDirection }}
LIMIT
	{{ paginationNum }}
OFFSET
	{{ page }} * {{ paginationNum }};