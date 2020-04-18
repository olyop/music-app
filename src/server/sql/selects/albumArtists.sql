SELECT
  album_artist_id,
  album_id,
  artist_id,
  artist_index
FROM
  albums_artists
WHERE
  album_id = album_id
ORDER BY
  artist_index ASC;
