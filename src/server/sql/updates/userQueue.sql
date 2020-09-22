UPDATE
  {{ tableName }}
SET
  index = index + 1
WHERE
  user_id = {{ userId }} AND
  index = {{ index }}
RETURNING
  user_id, song_id, index;