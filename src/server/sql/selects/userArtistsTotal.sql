SELECT
	*
FROM
	users_artists
JOIN
	artists
		ON users_artists.artist_id = artists.artist_id
WHERE
	in_library = true AND
	user_id = {{ userId }};