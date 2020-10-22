SELECT
	{{ columnNames }}
FROM
	genres
WHERE
	genre_id in(
		SELECT
			genre_id
		FROM
			songs_genres
		WHERE
			song_id in(
				SELECT
					song_id
				FROM
					users_songs
				WHERE
					in_library = true AND
					user_id = {{ userId }}
			)
	)
ORDER BY
	genres.{{ orderByField }} {{ orderByDirection }}
LIMIT
	{{ paginationNum }}
OFFSET
	{{ page }} * {{ paginationNum }};