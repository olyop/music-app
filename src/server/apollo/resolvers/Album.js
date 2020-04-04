import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import database from "../../database/index.js"
import { resolver, pipe, toDataUrl } from "../../helpers/misc.js"

import {
  restoreOrder,
  determinePlaySelect,
  determineSongSelect,
  determineArtistSelect,
} from "../../helpers/resolvers.js"

import {
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/collections.js"

const {
  Play,
  Song,
  Artist,
  UserAlbum,
} = database.models

export default {
  cover: resolver(
    ({ parent }) => toDataUrl(parent.cover),
  ),
  songs: resolver(
    async ({ parent, info }) => {
      const { id: albumId } = parent

      const query =
        Song.find({ album: albumId })
          .select(determineSongSelect(info))
          .lean()
          .exec()
      
      return deserializeCollection(await query)
    },
  ),
  artists: resolver(
    async ({ parent, info }) => {
      const { artists } = parent

      const query =
        Artist.find({ _id: artists })
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(artists),
      ) 
    },
  ),
  plays: resolver(
    async ({ parent, args, info }) => {
      const { userId } = args
      const { id: albumId } = parent

      const songsQuery =
        Song.find({ album: albumId })
          .select({ _id: 1 })
          .lean()
          .exec()

      const songs = deserializeCollection(await songsQuery)
      const songsId = songs.map(({ id }) => id)

      const playQuery =
        Play.find({ user: userId, song: songsId })
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
      const { id: albumId } = parent

      const query =
        UserAlbum.findOne({ user: userId, album: albumId })
          .select({ _id: 1 })
          .lean()
          .exec()
      
      const userAlbum = await query

      if (isNull(userAlbum)) {
        return null
      } else {
        return deserializeDocument(userAlbum).dateCreated
      }
    },
  ),
  numOfPlays: resolver(
    async ({ parent, args, info }) => {
      const { userId } = args
      const { id: albumId } = parent

      const songsQuery =
        Song.find({ album: albumId })
          .select({ _id: 1 })
          .lean()
          .exec()

      const songs = deserializeCollection(await songsQuery)
      const songsId = songs.map(({ id }) => id)

      const playQuery =
        Play.find({ user: userId, song: songsId })
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
      const { id: albumId } = parent

      const query =
        UserAlbum.findOne({
            user: userId,
            album: albumId,
            inLibrary: true,
          })
          .select({ inLibrary: 1 })
          .lean()
          .exec()
      
      const userAlbum = await query

      if (isNull(userAlbum)) {
        return null
      } else {
        return deserializeDocument(userAlbum).inLibrary
      }
    },
  ),
}
