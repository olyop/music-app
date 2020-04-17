SELECT
  playlists_id,
  title,
  date_created
FROM
  playlists
WHERE
  playlists_id = :playlists_id;
