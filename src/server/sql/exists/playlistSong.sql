SELECT EXISTS (
	SELECT
		*
	FROM
		playlists_songs
	WHERE
		song_id = {{ songId }} AND
		playlist_id = {{ playlistId }}
);