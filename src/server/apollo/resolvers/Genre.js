import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import database from "../../database/index.js"

import {
  resolver,
  playSelect,
  songSelect,
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/index.js"

const {
  Play,
  Song,
  UserGenre,
} = database.models

export default {
  songs: resolver(
    async ({ parent, info }) => {
      const { id: genreId }  = parent

      const query =
        Song.find({ genres: genreId })
            .select(songSelect(info))
            .lean()
            .exec()
      
      return deserializeCollection(await query)
    },
  ),
  plays: resolver(
    async ({ parent, args, info }) => {
      const { userId } = args
      const { id: genreId } = parent

      const songsQuery =
        Song.find({ genres: genreId })
            .select({ _id: 1 })
            .lean()
            .exec()

      const songs = deserializeCollection(await songsQuery)
      const songsId = songs.map(({ id }) => id)

      const playQuery =
        Play.find({ user: userId, song: songsId })
            .select(playSelect(info))
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
      const { id: genreId } = parent

      const query =
        UserGenre.findOne({ user: userId, genre: genreId })
            .select({ inLibrary: 1 })
            .lean()
            .exec()
      
      const userGenre = await query

      if (isNull(userGenre)) {
        return null
      } else {
        return deserializeDocument(userGenre).dateCreated
      }
    },
  ),
  numOfPlays: resolver(
    async ({ parent, args, info }) => {
      const { userId } = args
      const { id: genreId } = parent

      const songsQuery =
        Song.find({ genres: genreId })
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
      const { id: genreId } = parent
      
      const query =
        UserGenre.findOne({
                    user: userId,
                    genre: genreId,
                    inLibrary: true,
                  })
                  .select({ inLibrary: 1 })
                  .lean()
                  .exec()
      
      const userGenre = await query

      if (isNull(userGenre)) {
        return false
      } else {
        return deserializeDocument(userGenre).inLibrary
      }
    },
  ),
}
