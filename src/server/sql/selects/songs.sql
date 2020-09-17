SELECT
  {{ columnNames }}
FROM
  songs
ORDER BY
  {{ orderByField }} {{ orderByDirection }}
LIMIT
  {{ paginationNum }}
OFFSET
  {{ offset }};