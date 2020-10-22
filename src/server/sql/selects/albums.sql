SELECT
	{{ columnNames }}
FROM
	albums
ORDER BY
	{{ orderByField }} {{ orderByDirection }}
LIMIT
	{{ paginationNum }}
OFFSET
	{{ page }} * {{ paginationNum }};