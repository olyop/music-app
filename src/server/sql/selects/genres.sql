SELECT
  {{ columnNames }}
FROM
  genres
ORDER BY
  {{ orderByField }} {{ orderByDirection }};
