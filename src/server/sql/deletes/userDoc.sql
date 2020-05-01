DELETE FROM
  {{ tableName }}
WHERE
  user_id = {{ userId }} &&
  {{ columnName }} = {{ docId }};
