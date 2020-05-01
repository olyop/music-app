SELECT EXISTS (
  SELECT
    *
  FROM
    {{ tableName }}
  WHERE
    in_library = true &&
    user_id = {{ userId }} &&
    {{ columnName }} = {{ docId }}
);
