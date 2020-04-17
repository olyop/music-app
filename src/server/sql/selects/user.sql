SELECT
  user_id,
  name,
  date_created
FROM
  users
WHERE
  user_id = :user_id;
