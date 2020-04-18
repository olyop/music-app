INSERT INTO songs_remixers
  (
    song_id,
    artist_id,
    artist_index,
    song_remixer_id
  )
VALUES
  (
    :song_id,
    :artist_id,
    :artist_index,
    :song_remixer_id
  );
