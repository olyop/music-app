SELECT
  songs.song_id,
  songs.title,
  songs.mix,
  songs.duration,
  songs.disc_number,
  songs.track_number,
  
FROM
  songs
LEFT JOIN
  songs_artists AS art
  ON a.song_id = b.song_id;
