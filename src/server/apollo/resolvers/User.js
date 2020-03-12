import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  deserializeDocument,
  determineSongSelect,
  determinePlaySelect,
  deserializeCollection,
  determinePlaylistSelect,
  determineUserSongSelect,
  determineUserAlbumSelect,
  determineUserArtistSelect,
} from "../../helpers/resolvers.js"

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
    async ({ info, parent: { prev } }) => await (
      Song
        .find({ _id: prev })
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  nowPlaying: resolver(
    async ({ info, parent: { nowPlaying } }) => await (
      Song
        .findById(nowPlaying)
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
  next: resolver(
    async ({ info, parent: { next } }) => await (
      Song
        .find(next)
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
  later: resolver(
    async ({ info, parent: { later } }) => await (
      Song
        .find({ _id: later })
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  playlists: resolver(
    async ({ info, parent: { playlists } }) => await (
      Playlist
        .find({ _id: playlists })
        .select(determinePlaylistSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  plays: resolver(
    async ({ info, parent: { id } }) => await (
      Play
        .find({ user: id })
        .select(determinePlaySelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  songs: resolver(
    async ({ info, parent: { id } }) => await (
      UserSong
        .find({ user: id, inLibrary: true })
        .select(determineUserSongSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  albums: resolver(
    async ({ info, parent: { id } }) => await (
      UserAlbum
        .find({ user: id, inLibrary: true })
        .select(determineUserAlbumSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  artists: resolver(
    async ({ info, parent: { id } }) => await (
      UserArtist
        .find({ user: id, inLibrary: true })
        .select(determineUserArtistSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
}
