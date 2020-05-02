INSERT INTO users
  (
    user_id,
    name,
    email
  )
VALUES
  (
    '',
    'Oliver',
    'oliver.plummer@outlook.com'
  )
RETURNING
  user_id,
  name,
  email,
  date_created;
