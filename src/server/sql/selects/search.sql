SELECT
  {{ columnNames }}
FROM
  {{ tableName }}
WHERE
  lower({{ columnName }}) LIKE {{ query }}
ORDER BY
  {{ columnName }} ASC
LIMIT
  10;
