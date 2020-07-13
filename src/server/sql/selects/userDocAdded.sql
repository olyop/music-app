SELECT
  date_added
FROM
  {{ tableName }}
WHERE
  user_id = {{ userId }} AND
  {{ columnName }} = {{ docId }};
