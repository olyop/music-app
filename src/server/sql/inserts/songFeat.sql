INSERT INTO songs_featurings
  (
    song_id,
    artist_id,
    artist_index,
    song_featuring_id
  )
VALUES
  (
    '{{ songId }}',
    '{{ artistId }}',
    {{ artistIndex }},
    '{{ songFeaturingId }}'
  );
