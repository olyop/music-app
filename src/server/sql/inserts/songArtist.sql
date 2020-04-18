INSERT INTO songs_artists
  (
    song_id,
    artist_id,
    artist_index,
    song_artist_id
  )
VALUES
  (
    :song_id,
    :artist_id,
    :artist_index,
    :song_artist_id
  );
