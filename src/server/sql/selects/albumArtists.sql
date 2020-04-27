SELECT
  b.name,
  a.artist_id,
  a.index
FROM
  albums_artists AS a
JOIN
  artists AS b
  ON
    a.artist_id = b.artist_id
WHERE
  a.album_id = {{ albumId }};
