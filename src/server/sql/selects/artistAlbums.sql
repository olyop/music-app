SELECT DISTINCT
  b.album_id,
  b.title,
  b.released
FROM
  (SELECT
    album_id
  FROM
    albums_artists
  WHERE
    artist_id = {{ artistId }}) AS a
JOIN
  albums AS b ON
    a.album_id = b.album_id
ORDER BY
  b.released ASC;
