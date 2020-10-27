INSERT INTO songs_featurings (
	song_id,
	artist_id,
	index
) VALUES (
	{{ songId }},
	{{ artistId }},
	{{ index }}
);