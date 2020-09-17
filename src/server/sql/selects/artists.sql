SELECT
  {{ columnNames }}
FROM
  artists
ORDER BY
  {{ orderByField }} {{ orderByDirection }}
LIMIT
  {{ paginationNum }}
OFFSET
  {{ offset }}