INSERT INTO songs_genres
	(
		song_id,
		genre_id,
		index
	)
VALUES
	(
		{{ songId }},
		{{ genreId }},
		{{ index }}
	);