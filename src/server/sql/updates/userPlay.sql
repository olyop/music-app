UPDATE
  users
SET
  current = {{ songId }}
WHERE
  user_id = {{ userId }}
RETURNING
  {{ columnNames }};