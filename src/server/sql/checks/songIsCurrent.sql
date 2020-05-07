SELECT
  nullif(current, {{ songId }}) AS isCurrent
FROM
  users
WHERE
  user_id = {{ userId }}
LIMIT
  1;
