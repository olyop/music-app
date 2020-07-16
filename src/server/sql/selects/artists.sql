SELECT
  {{ columnNames }}
FROM
  artists
ORDER BY
  {{ orderByField }} {{ orderByDirection }};
