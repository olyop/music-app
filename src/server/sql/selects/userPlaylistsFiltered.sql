SELECT
	{{ columnNames }}
FROM
	users_playlists
JOIN
	playlists
		ON users_playlists.playlist_id = playlists.playlist_id
WHERE
	in_library = true AND 
	users_playlists.user_id = {{ userId }} AND
	NOT EXISTS (
		SELECT
			*
		FROM
			playlists_songs
		WHERE
			song_id = {{ songId }} AND
			playlist_id = users_playlists.playlist_id
	);