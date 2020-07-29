SELECT
  {{ columnNames }}
FROM
  {{ tableName }}
WHERE
  {{ columnName }} {{ sqlSearchType }} {{ query }}
ORDER BY
  {{ columnName }} ASC
LIMIT
  10;