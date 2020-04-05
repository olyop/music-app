import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determinePlaySelect,
  determineSongSelect,
} from "../../helpers/resolvers.js"

import {
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/collections.js"

const {
  Play,
  User,
  Song,
  UserPlaylist,
  PlaylistSong,
} = database.models

export default {
  user: resolver(
    async ({ parent, info }) => {
      const query =
        User.findById(parent.user)
          .select(determineUserSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  songs: resolver(
    async ({ parent, info }) => {
      const { id: playlistId } = parent

      const playlistSongQuery =
        PlaylistSong.find({ playlist: playlistId, inPlaylist: true })
          .select({ song: 1 })
          .lean()
          .exec()

      const playlistSongs = deserializeCollection(await playlistSongQuery)
      const playlistSongsIds = playlistSongs.map(({ song }) => song)

      const songsQuery =
        Song.find({ _id: playlistSongsIds })
          .select(determineSongSelect(info))
          .lean()
          .exec()

      return deserializeCollection(await songsQuery)
    },
  ),
  plays: resolver(
    async ({ parent, args, info }) => {
      const { userId } = args
      const { id: playlistId } = parent

      const playlistSongQuery =
        PlaylistSong.find({ playlist: playlistId, inPlaylist: true })
          .select({ song: 1 })
          .lean()
          .exec()

      const playlistSongs = deserializeCollection(await playlistSongQuery)
      const playlistSongsIds = playlistSongs.map(({ song }) => song)

      const playQuery =
        Play.find({ user: userId, song: playlistSongsIds })
          .select(determinePlaySelect(info))
          .lean()
          .exec()

      const plays = deserializeCollection(await playQuery)

      if (isEmpty(plays)) {
        return null
      } else {
        return plays
      }
    },
  ),
  dateAdded: resolver(
    async ({ parent, args }) => {
      const { userId } = args
      const { id: playlistId } = parent

      const query =
        UserPlaylist.findOne({ user: userId, playlist: playlistId })
          .select({ inLibrary: 1 })
          .lean()
          .exec()
      
      const userPlaylist = await query

      if (isNull(userPlaylist)) {
        return null
      } else {
        return deserializeDocument(userPlaylist).dateCreated
      }
    },
  ),
  numOfPlays: resolver(
    async ({ parent, args, info }) => {
      const { userId } = args
      const { id: playlistId } = parent

      const playlistSongQuery =
        PlaylistSong.find({ playlist: playlistId, inPlaylist: true })
          .select({ song: 1 })
          .lean()
          .exec()

      const playlistSongs = deserializeCollection(await playlistSongQuery)
      const playlistSongsIds = playlistSongs.map(({ song }) => song)

      const playQuery =
        Play.find({ user: userId, song: playlistSongsIds })
          .select(determinePlaySelect(info))
          .lean()
          .exec()

      const plays = deserializeCollection(await playQuery)

      if (isEmpty(plays)) {
        return null
      } else {
        return plays.length
      }
    },
  ),
  inLibrary: resolver(
    async ({ parent, args }) => {
      const { userId } = args
      const { id: playlistId } = parent
      
      const query =
        UserPlaylist.findOne({
            user: userId,
            inLibrary: true,
            playlist: playlistId,
          })
          .select({ inLibrary: 1 })
          .lean()
          .exec()
      
      const userPlaylist = await query

      if (isNull(userPlaylist)) {
        return false
      } else {
        return deserializeDocument(userPlaylist).inLibrary
      }
    },
  ),
}
