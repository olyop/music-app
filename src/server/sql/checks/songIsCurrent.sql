SELECT
  nullif(current, nullif(current, {{ songId }})) AS is_current
FROM
  users
WHERE
  user_id = {{ userId }}
LIMIT
  1;
