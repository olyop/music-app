import mongoose from "mongoose"

import PlaySchema from "./schemas/Play.js"
import SongSchema from "./schemas/Song.js"
import UserSchema from "./schemas/User.js"
import AlbumSchema from "./schemas/Album.js"
import GenreSchema from "./schemas/Genre.js"
import ArtistSchema from "./schemas/Artist.js"
import PlaylistSchema from "./schemas/Playlist.js"
import UserSongSchema from "./schemas/UserSong.js"
import UserAlbumSchema from "./schemas/UserAlbum.js"
import UserGenreSchema from "./schemas/UserGenre.js"
import UserArtistSchema from "./schemas/UserArtist.js"
import UserPlaylistSchema from "./schemas/UserPlaylist.js"
import PlaylistSongSchema from "./schemas/PlaylistSong.js"

// Initialize database connection
const database = mongoose.createConnection()

database.model("Play", PlaySchema, "plays")
database.model("Song", SongSchema, "songs")
database.model("User", UserSchema, "users")
database.model("Album", AlbumSchema, "albums")
database.model("Genre", GenreSchema, "genres")
database.model("Artist", ArtistSchema, "artists")
database.model("Playlist", PlaylistSchema, "playlists")
database.model("UserSong", UserSongSchema, "userSongs")
database.model("UserAlbum", UserAlbumSchema, "userAlbums")
database.model("UserGenre", UserGenreSchema, "userGenres")
database.model("UserArtist", UserArtistSchema, "userArtists")
database.model("UserPlaylist", UserPlaylistSchema, "userPlaylists")
database.model("PlaylistSong", PlaylistSongSchema, "playlistSongs")

export default database
