import isNull from "lodash/isNull.js"
import database from "../../database/index.js"

import {
  pipe,
  resolver,
  playSelect,
  songSelect,
  albumSelect,
  genreSelect,
  artistSelect,
  restoreOrder,
  playlistSelect,
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/index.js"

const {
  Play,
  Song,
  Genre,
  Album,
  Artist,
  Playlist,
  UserSong,
  UserGenre,
  UserAlbum,
  UserArtist,
  UserPlaylist,
} = database.models

export default {
  current: resolver(
    async ({ parent, info }) => {
      const { current } = parent
      if (isNull(current)) {
        return null
      } else {
        const query =
          Song.findById(current)
              .select(songSelect(info))
              .lean()
              .exec()
        return deserializeDocument(await query)
      }
    }
  ),
  prev: resolver(
    async ({ parent, info }) => {
      const { prev } = parent

      const query =
        Song.find({ _id: parent.prev })
            .select(songSelect(info))
            .lean()
            .exec()

      return pipe(await query)(
        deserializeCollection,
        restoreOrder(prev),
      )
    },
  ),
  next: resolver(
    async ({ parent, info }) => {
      const { next } = parent

      const query =
        Song.find({ _id: next })
            .select(songSelect(info))
            .lean()
            .exec()
      
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(next),
      )
    },
  ),
  queue: resolver(
    async ({ parent, info }) => {
      const { queue } = parent

      const query =
        Song.find({ _id: queue })
            .select(songSelect(info))
            .lean()
            .exec()
      
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(queue),
      )
    },
  ),
  plays: resolver(
    async ({ parent, info }) => {
      const { id: userId } = parent

      const query =
        Play.find({ user: userId })
            .select(playSelect(info))
            .lean()
            .exec()
          
      return deserializeCollection(await query)
    },
  ),
  songs: resolver(
    async ({ parent, info }) => {
      const { id: userId } = parent

      const userSongsQuery =
        UserSong.find({ user: userId, inLibrary: true })
                .select({ _id: 1, song: 1 })
                .lean()
                .exec()

      const userSongs = deserializeCollection(await userSongsQuery)
      const userSongsIds = userSongs.map(({ song }) => song)

      const songsQuery =
        Song.find({ _id: userSongsIds })
            .select(songSelect(info))
            .lean()
            .exec()

      return deserializeCollection(await songsQuery)
    },
  ),
  genres: resolver(
    async ({ parent, info }) => {
      const { id: userId } = parent

      const userGenresQuery =
        UserGenre.find({ user: userId, inLibrary: true })
                 .select({ _id: 1, genre: 1 })
                 .lean()
                 .exec()

      const userGenres = deserializeCollection(await userGenresQuery)
      const userGenresId = userGenres.map(({ genre }) => genre)

      const genresQuery =
        Genre.find({ _id: userGenresId })
             .select(genreSelect(info))
             .lean()
             .exec()

      return deserializeCollection(await genresQuery)
    },
  ),
  albums: resolver(
    async ({ parent, info }) => {
      const { id: userId } = parent

      const userAlbumsQuery =
        UserAlbum.find({ user: userId, inLibrary: true })
                 .select({ _id: 1, album: 1 })
                 .lean()
                 .exec()

      const userAlbums = deserializeCollection(await userAlbumsQuery)
      const userAlbumsId = userAlbums.map(({ album }) => album)

      const albumsQuery =
        Album.find({ _id: userAlbumsId })
             .select(albumSelect(info))
             .lean()
             .exec()

      return deserializeCollection(await albumsQuery)
    },
  ),
  artists: resolver(
    async ({ parent, info }) => {
      const { id: userId } = parent

      const userArtistsQuery =
        UserArtist.find({ user: userId, inLibrary: true })
                  .select({ _id: 1, artist: 1 })
                  .lean()
                  .exec()

      const userArtists = deserializeCollection(await userArtistsQuery)
      const userArtistsId = userArtists.map(({ artist }) => artist)

      const artistsQuery =
        Artist.find({ _id: userArtistsId })
              .select(artistSelect(info))
              .lean()
              .exec()

      return deserializeCollection(await artistsQuery)
    },
  ),
  playlists: resolver(
    async ({ parent, info }) => {
      const { id: userId } = parent

      const userPlaylistsQuery =
        UserPlaylist.find({ user: userId, inLibrary: true })
                    .select({ _id: 1, playlist: 1 })
                    .lean()
                    .exec()

      const userPlaylists = deserializeCollection(await userPlaylistsQuery)
      const userPlaylistsId = userPlaylists.map(({ playlist }) => playlist)

      const playlistsQuery =
        Playlist.find({ _id: userPlaylistsId })
                .select(playlistSelect(info))
                .lean()
                .exec()

      return deserializeCollection(await playlistsQuery)
    },
  ),
}
