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
    {{ dateCreated }}
  )
RETURNING
  user_id,
  name,
  email,
  date_created;
