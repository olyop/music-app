SELECT
  {{ columnNames }}
FROM
  songs
WHERE
  song_id in(
    SELECT
      song_id
    FROM
      {{ tableName }}
    WHERE
      user_id = {{ userId }}
  );
