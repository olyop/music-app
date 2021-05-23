SELECT
	{{ columnNames }}
FROM
	users_playlists
JOIN
	playlists
		ON users_playlists.playlist_id = playlists.playlist_id
WHERE
	in_library = true AND
	users_playlists.user_id = {{ userId }}
ORDER BY
	{{ orderByTableName }}.{{ orderByField }} {{ orderByDirection }}
LIMIT
	{{ paginationNum }}
OFFSET
	{{ page }} * {{ paginationNum }};