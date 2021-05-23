INSERT INTO songs (
	bpm,
	mix,
	title,
	key_id,
	song_id,
	album_id,
	duration,
	disc_number,
	track_number
) VALUES (
	{{ bpm }},
	{{ mix }},
	{{ title }},
	{{ keyId }},
	{{ songId }},
	{{ albumId }},
	{{ duration }},
	{{ discNumber }},
	{{ trackNumber }}
) RETURNING
	{{ columnNames }};