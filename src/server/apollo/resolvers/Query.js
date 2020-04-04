import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determinePlaySelect,
  determineUserSelect,
  determineSongSelect,
  determineAlbumSelect,
  determineGenreSelect,
  determineArtistSelect,
  determinePlaylistSelect,
} from "../../helpers/resolvers.js"

import {
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/collections.js"

const {
  User,
  Play,
  Song,
  Album,
  Genre,
  Artist,
  Playlist,
} = database.models

export default {
  users: resolver(
    async ({ info }) => {
      const query =
        User.find()
          .select(determineUserSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  plays: resolver(
    async ({ info }) => {
      const query =
        Play.find()
          .select(determinePlaySelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  songs: resolver(
    async ({ info }) => {
      const query =
        Song.find()
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  albums: resolver(
    async ({ info }) => {
      const query =
        Album.find()
          .select(determineAlbumSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  genres: resolver(
    async ({ info }) => {
      const query =
        Genre.find()
          .select(determineGenreSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  artists: resolver(
    async ({ info }) => {
      const query =
        Artist.find()
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  playlists: resolver(
    async ({ info }) => {
      const query =
        Playlist.find()
          .select(determinePlaylistSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    }
  ),
  user: resolver(
    async ({ args, info }) => {
      const query =
        User.findById(args.userId)
          .select(determineUserSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  play: resolver(
    async ({ args, info }) => {
      const query =
        Play.findById(args.playId)
          .select(determinePlaySelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  song: resolver(
    async ({ args, info }) => {
      const query =
        Song.findById(args.songId)
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  album: resolver(
    async ({ args, info }) => {
      const query =
        Album.findById(args.albumId)
          .select(determineAlbumSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  genre: resolver(
    async ({ args, info }) => {
      const query =
        Genre.findById(args.genreId)
          .select(determineGenreSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  artist: resolver(
    async ({ args, info }) => {
      const query =
        Artist.findById(args.artistId)
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  playlist: resolver(
    async ({ args, info }) => {
      const query =
        Playlist.findById(args.playlistId)
          .select(determinePlaylistSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ), 
}
