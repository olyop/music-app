SELECT
  {{ columnNames }}
FROM
  artists
ORDER BY
  {{ orderByField }} {{ orderByDirection }}
LIMIT
  30
OFFSET
  {{ offset }}