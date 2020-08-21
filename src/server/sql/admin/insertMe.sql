INSERT INTO users
  (
    user_id,
    name
  )
VALUES
  (
    '',
    'Oliver'
  )
RETURNING
  user_id,
  name,
  date_created;