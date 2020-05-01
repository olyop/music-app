/* eslint-disable camelcase */

const genre = [
  "genre_id",
  "name",
]

const artist = [
  "artist_id",
  "name",
]

const play = [
  "play_id",
  "date_created",
]

const album = [
  "album_id",
  "title",
  "released",
]

const user = [
  "user_id",
  "name",
  "date_created",
]

const song = [
  "song_id",
  "title",
  "mix",
  "album_id",
  "duration",
  "disc_number",
  "track_number",
]

const user_song = [
  "user_id",
  "song_id",
  "in_library",
  "date_created",
]

const user_album = [
  "user_id",
  "album_id",
  "in_library",
  "date_created",
]

const user_genre = [
  "user_id",
  "genre_id",
  "in_library",
  "date_created",
]

const user_artist = [
  "user_id",
  "artist_id",
  "in_library",
  "date_created",
]

const columnNames = {
  play,
  user,
  song,
  genre,
  album,
  artist,
  user_song,
  user_album,
  user_genre,
  user_artist,
}

export default columnNames
