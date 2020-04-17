CREATE TABLE IF NOT EXISTS playlists_songs (
  playlist_song_id uuid NOT NULL,
  playlist_id uuid NOT NULL,
  song_id uuid NOT NULL,
  in_playlist boolean NOT NULL,
  date_created integer NOT NULL,
  CONSTRAINT playlists_songs_pk
    PRIMARY KEY (playlist_song_id),
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
  CONSTRAINT playlists_songs_check_date_created
    CHECK (date_created >= 1)
);
