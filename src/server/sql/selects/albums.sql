SELECT
  {{ columnNames }}
FROM
  albums
ORDER BY
  {{ orderByField }} {{ orderByDirection }};
