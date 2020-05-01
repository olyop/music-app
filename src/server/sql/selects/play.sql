SELECT
  {{ columnNames }}
FROM
  plays
WHERE
  play_id = {{ playId }}
LIMIT
  1;
