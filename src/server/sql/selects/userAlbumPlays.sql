SELECT
  {{ columnNames }}
FROM
  plays
WHERE
  user_id = {{ userId }} AND
  song_id in(
    SELECT
      song_id
    FROM
      songs
    WHERE
      album_id = {{ docId }}
  );
