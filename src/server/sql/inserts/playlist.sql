INSERT INTO playlists (
	title,
	user_id,
	playlist_id
) VALUES (
	{{ title }},
	{{ userId }},
	{{ playlistId }}
) RETURNING
	{{ columnNames }};