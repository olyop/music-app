import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determineSongSelect,
  determinePlaySelect,
  determinePlaylistSelect,
  determineUserSongSelect,
  determineUserAlbumSelect,
  determineUserArtistSelect,
} from "../../helpers/resolvers.js"

import {
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/collections.js"

const {
  Play,
  Song,
  Playlist,
  UserSong,
  UserAlbum,
  UserArtist,
} = database.models

export default {
  prev: resolver(
    async ({ info, parent: { prev } }) => {
      const query =
        Song
          .find({ _id: prev })
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  nowPlaying: resolver(
    async ({ info, parent: { nowPlaying } }) => {
      const query =
        Song
          .findById(nowPlaying)
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    }
  ),
  next: resolver(
    async ({ info, parent: { next } }) => {
      const query =
        Song
          .find({ _id: next })
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  later: resolver(
    async ({ info, parent: { later } }) => {
      const query =
        Song
          .find({ _id: later })
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  playlists: resolver(
    async ({ info, parent: { playlists } }) => {
      const query =
        Playlist
          .find({ _id: playlists })
          .select(determinePlaylistSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  plays: resolver(
    async ({ info, parent: { id } }) => {
      const query =
        Play
          .find({ user: id })
          .select(determinePlaySelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  songs: resolver(
    async ({ info, parent: { id } }) => {
      const query =
        UserSong
          .find({ user: id, inLibrary: true })
          .select(determineUserSongSelect(info,["user"]))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  albums: resolver(
    async ({ info, parent: { id } }) => {
      const query =
        UserAlbum
          .find({ user: id, inLibrary: true })
          .select(determineUserAlbumSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  artists: resolver(
    async ({ info, parent: { id } }) => {
      const query =
        UserArtist
          .find({ user: id, inLibrary: true })
          .select(determineUserArtistSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
}
