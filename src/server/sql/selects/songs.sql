SELECT
  {{ columnNames }}
FROM
  songs
ORDER BY
  {{ orderByField }} {{ orderByDirection }};
