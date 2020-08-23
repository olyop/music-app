INSERT INTO users
  (
    name,
    email,
    user_id
  )
VALUES
  (
    {{ name }},
    {{ email }},
    {{ userId }}
  );