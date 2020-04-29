SELECT
  user_id,
  name,
  date_created
FROM
  users
WHERE
  user_id = {{ userId }}
LIMIT
  1;
