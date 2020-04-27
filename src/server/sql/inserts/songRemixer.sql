INSERT INTO songs_remixers
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
