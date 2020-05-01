SELECT
  {{ columnNames }}
FROM
  plays
WHERE
  user_id = {{ userId }} &&
  song_id in(
    SELECT
      song_id
    FROM
      songs
    WHERE
      album_id = {{ docId }}
  );
