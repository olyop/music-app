import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import database from "../../database/index.js"
import { resolver, pipe } from "../../helpers/misc.js"

import {
  restoreOrder,
  determinePlaySelect,
  determineGenreSelect,
  determineAlbumSelect,
  determineArtistSelect,
} from "../../helpers/resolvers.js"

import {
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/collections.js"

const {
  Play,
  Genre,
  Album,
  Artist,
  UserSong,
} = database.models

export default {
  album: resolver(
    async ({ parent, info }) => {
      const { album } = parent

      const query =
        Album.findById(album)
          .select(determineAlbumSelect(info))
          .lean()
          .exec()
      
      return deserializeDocument(await query)
    },
  ),
  genres: resolver(
    async ({ parent, info }) => {
      const { genres } = parent

      const query =
        Genre.find({ _id: genres })
          .select(determineGenreSelect(info))
          .lean()
          .exec()
      
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(genres),
      )
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
  remixers: resolver(
    async ({ parent, info }) => {
      const { remixers } = parent

      const query =
        Artist.find({ _id: remixers })
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(remixers),
      )
    },
  ),
  featuring: resolver(
    async ({ parent, info }) => {
      const { featuring } = parent

      const query =
        Artist.find({ _id: featuring })
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(featuring),
      )
    },
  ),
  plays: resolver(
    async ({ parent, args, info }) => {
      const { userId } = args
      const { id: songId } = parent

      const query =
        Play.find({ user: userId, song: songId })
          .select(determinePlaySelect(info))
          .lean()
          .exec()

      const plays = deserializeCollection(await query)

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
      const { id: songId } = parent

      const query =
        UserSong.findOne({ user: userId, song: songId })
          .select({ inLibrary: 1 })
          .lean()
          .exec()
      
      const userSong = await query

      if (isNull(userSong)) {
        return null
      } else {
        return deserializeDocument(userSong).dateCreated
      }
    },
  ),
  numOfPlays: resolver(
    async ({ parent, args, info }) => {
      const { userId } = args
      const { id: songId } = parent

      const query =
        Play.find({ user: userId, song: songId })
          .select(determinePlaySelect(info))
          .lean()
          .exec()

      const plays = deserializeCollection(await query)

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
      const { id: songId } = parent

      const query =
        UserSong.findOne({
            user: userId,
            song: songId,
            inLibrary: true,
          })
          .select({ inLibrary: 1 })
          .lean()
          .exec()
      
      const userSong = await query

      if (isNull(userSong)) {
        return null
      } else {
        return deserializeDocument(userSong).inLibrary
      }
    },
  ),
}
