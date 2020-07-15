SELECT
  {{ columnNames }}
FROM
  songs
ORDER BY
  songs.{{ orderByField }} {{ orderByDirection }};
