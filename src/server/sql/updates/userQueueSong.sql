UPDATE
  {{ tableName }}
SET
  index = index {{ addSubtract }} 1
WHERE
  index = {{ index }} AND
  song_id = {{ songId }} AND
  user_id = {{ userId }};