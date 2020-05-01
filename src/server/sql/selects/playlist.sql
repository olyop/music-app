SELECT
  {{ columnNames }}
FROM
  playlists
WHERE
  playlists_id = {{ playlistsId }};
