SELECT EXISTS (
  SELECT
    *
  FROM
    {{ tableName }}
  WHERE
    user_id = {{ userId }} &&
    {{ columnName }} = {{ docId }}
);
