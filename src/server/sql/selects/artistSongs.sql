SELECT DISTINCT
  {{ columnNames }}
FROM
  (
    SELECT
      song_id
    FROM
      songs_artists
    WHERE
      artist_id = {{ artistId }}
    UNION
    SELECT
      song_id
    FROM
      songs_remixers
    WHERE
      artist_id = {{ artistId }}
    UNION
    SELECT
      song_id
    FROM
      songs_featurings
    WHERE
      artist_id = {{ artistId }}
  ) AS artist_songs_ids
JOIN
  songs
    ON artist_songs_ids.song_id = songs.song_id
ORDER BY
  songs.{{ orderByField }} {{ orderByDirection }};
