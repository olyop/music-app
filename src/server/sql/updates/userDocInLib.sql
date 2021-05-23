UPDATE
  {{ tableName }}
SET
  in_library = NOT in_library
WHERE
  user_id = {{ userId }} AND
  {{ columnName }} = {{ docId }};