SELECT
  {{ columnNames }}
FROM
  {{ tableName }}
WHERE
  lower({{ columnName }}) LIKE {{ query }}
LIMIT
  10;
