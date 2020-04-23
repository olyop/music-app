INSERT INTO albums_artists
  (
    album_artist_id,
    album_id,
    artist_id,
    artist_index
  )
VALUES
  (
    '{{ albumArtistId }}',
    '{{ albumId }}',
    '{{ artistId }}',
    {{ artistIndex }}
  );
