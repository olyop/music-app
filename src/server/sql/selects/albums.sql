SELECT
  {{ columnNames }}
FROM
  albums
ORDER BY
  {{ orderByField }} {{ orderByDirection }}
LIMIT
  30
OFFSET
  {{ offset }};
