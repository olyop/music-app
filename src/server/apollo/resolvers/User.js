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
    async ({ info, parent: { prev } }) => {
      const filter = { _id: prev }
      const query = Song.find(filter)
      const select = determineSongSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
  nowPlaying: resolver(
    async ({ info, parent: { nowPlaying } }) => {
      const query = Song.findById(nowPlaying)
      const select = determineSongSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    }
  ),
  next: resolver(
    async ({ info, parent: { next } }) => {
      const filter = { _id: next }
      const query = Song.find(filter)
      const select = determineSongSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
  later: resolver(
    async ({ info, parent: { later } }) => {
      const filter = { _id: later }
      const query = Song.find(filter)
      const select = determineSongSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
  playlists: resolver(
    async ({ info, parent: { playlists } }) => {
      const filter = { _id: playlists }
      const query = Playlist.find(filter)
      const select = determinePlaylistSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    },
  ),
  plays: resolver(
    async ({ info, parent: { id } }) => {
      const filter = { user: id }
      const query = Play.find(filter)
      const select = determinePlaySelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
  songs: resolver(
    async ({ info, parent: { id } }) => {
      const filter = { user: id, inLibrary: true }
      const query = UserSong.find(filter)
      const select = determineUserSongSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
  albums: resolver(
    async ({ info, parent: { id } }) => {
      const filter = { user: id, inLibrary: true }
      const query = UserAlbum.find(filter)
      const select = determineUserAlbumSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
  artists: resolver(
    async ({ info, parent: { id } }) => {
      const filter = { user: id, inLibrary: true }
      const query = UserArtist.find(filter)
      const select = determineUserArtistSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
}
