UPDATE
  {{ tableName }}
SET
  inLibrary = NOT inLibrary
WHERE
  user_id = {{ userId }} &&
  {{ columnName }} = {{ docId }};
