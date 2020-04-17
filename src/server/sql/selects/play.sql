SELECT
  play_id,
  date_created
FROM
  plays
WHERE
  play_id = :play_id;
