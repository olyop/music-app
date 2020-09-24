SELECT
  {{ columnNames }}
FROM
  plays
WHERE
  song_id = {{ songId }};