SELECT
	{{ columnNames }}
FROM
	songs
JOIN
	albums
		ON songs.album_id = albums.album_id
ORDER BY
	{{ orderByField }} {{ orderByDirection }},
	songs.album_id ASC,
	songs.disc_number ASC,
	songs.track_number ASC
LIMIT
	{{ paginationNum }}
OFFSET
	{{ offset }};