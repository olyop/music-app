INSERT INTO users
  (
    user_id,
    name,
    email,
    date_created
  )
VALUES
  (
    {{ userId }},
    {{ name }},
    {{ email }},
    now()
  )
RETURNING
  {{ columnNames }};
