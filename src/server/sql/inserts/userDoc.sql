INSERT INTO {{ tableName }}
  (
    user_id,
    {{ columnName }},
    in_library,
    date_created
  )
VALUES
  (
    {{ userId }},
    {{ docId }},
    true,
    now()
  );
