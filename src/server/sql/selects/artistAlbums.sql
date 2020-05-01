SELECT DISTINCT
  {{ columnNames }}
FROM
  (
    SELECT
      album_id
    FROM
      albums_artists
    WHERE
      artist_id = {{ artistId }}
  ) AS artist_albums
JOIN
   albums
    ON artist_albums.album_id = albums.album_id
ORDER BY
  albums.released ASC;
