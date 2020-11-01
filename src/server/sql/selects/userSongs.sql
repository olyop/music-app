SELECT
	{{ columnNames }}
FROM
	users_songs
JOIN
	songs
		ON users_songs.song_id = songs.song_id
JOIN
	albums
		ON songs.album_id = albums.album_id
WHERE
	in_library = true AND
	user_id = {{ userId }}
ORDER BY
	{{ orderByField }} {{ orderByDirection }},
	songs.album_id ASC,
	songs.disc_number ASC,
	songs.track_number ASC
LIMIT
	{{ paginationNum }}
OFFSET
	{{ page }} * {{ paginationNum }};