SELECT
  {{ columnNames }}
FROM
  plays
WHERE
  user_id = {{ userId }} AND
  song_id = {{ songId }};
