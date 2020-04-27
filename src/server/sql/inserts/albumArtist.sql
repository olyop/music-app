INSERT INTO albums_artists
  (
    album_id,
    artist_id,
    index
  )
VALUES
  (
    {{ albumId }},
    {{ artistId }},
    {{ index }}
  );
