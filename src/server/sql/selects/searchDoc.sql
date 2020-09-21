SELECT
  {{ columnNames }}
FROM
  {{ tableName }}
WHERE
  {{ columnName }} {{ sqlSearchType }} {{ query }}
ORDER BY
  {{ columnName }} ASC
LIMIT
  {{ limit }};