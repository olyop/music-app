SELECT
  {{ columnNames }}
FROM
  genres
ORDER BY
	{{ orderByField }} {{ orderByDirection }}
LIMIT
	{{ paginationNum }}
OFFSET
	{{ page }} * {{ paginationNum }};