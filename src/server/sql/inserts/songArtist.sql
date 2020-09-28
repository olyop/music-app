INSERT INTO songs_artists
	(
		song_id,
		artist_id,
		index
	)
VALUES
	(
		{{ songId }},
		{{ artistId }},
		{{ index }}
	);
