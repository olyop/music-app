CREATE TABLE IF NOT EXISTS playlists_songs (
  playlist_id uuid,
  song_id uuid,
  in_playlist boolean NOT NULL,
  date_added integer NOT NULL DEFAULT date_part('epoch', now()),
  CONSTRAINT playlists_songs_pk
    PRIMARY KEY (playlist_id, song_id),
  CONSTRAINT playlists_songs_fk_playlist_id
    FOREIGN KEY (playlist_id)
    REFERENCES playlists (playlist_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT playlists_songs_fk_song_id
    FOREIGN KEY (song_id)
    REFERENCES songs (song_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT playlists_songs_check_date_added
    CHECK (date_added >= 1)
);
