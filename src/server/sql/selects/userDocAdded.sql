SELECT
  date_created
FROM
  {{ tableName }}
WHERE
  user_id = {{ userId }} &&
  {{ columnName }} = {{ docId }};
