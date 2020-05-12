SELECT
  {{ columnNames }}
FROM
  songs
JOIN
  albums ON
    albums.album_id = songs.album_id
ORDER BY
  albums.released DESC;
