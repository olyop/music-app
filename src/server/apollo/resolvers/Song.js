import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import database from "../../database/index.js"

import {
  pipe,
  resolver,
  playSelect,
  albumSelect,
  genreSelect,
  artistSelect,
  restoreOrder,
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/index.js"

const {
  User,
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
             .select(albumSelect(info))
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
             .select(genreSelect(info))
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
              .select(artistSelect(info))
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
              .select(artistSelect(info))
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
              .select(artistSelect(info))
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
            .select(playSelect(info))
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
            .select(playSelect(info))
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
        return false
      } else {
        return deserializeDocument(userSong).inLibrary
      }
    },
  ),
  isCurrent: resolver(
    async ({ parent, args }) => {
      const { userId } = args
      const { id: songId } = parent

      const query =
        User.findById(userId)
            .select({ current: 1 })
            .lean()
            .exec()
      
      const { current } = deserializeDocument(await query)

      if (isNull(current)) {
        return false
      } else if (current === songId) {
        return true
      } else {
        return false
      }
    },
  ),
}
