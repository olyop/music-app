SELECT
  b.play_id,
  b.song_id,
  b.user_id,
  b.date_created
FROM
  (
    SELECT
    song_id
    FROM
      songs
    WHERE
      album_id = {{ albumId }}
    ORDER BY
      title ASC
  ) AS a
JOIN
  plays AS b
    ON a.song_id = b.song_id
WHERE
  b.user_id = {{ userId }}
ORDER BY
  b.date_created DESC;
