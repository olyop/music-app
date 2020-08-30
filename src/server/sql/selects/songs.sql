SELECT
  {{ columnNames }}
FROM
  songs
ORDER BY
  {{ orderByField }} {{ orderByDirection }}
LIMIT
  30
OFFSET
  {{ offset }};