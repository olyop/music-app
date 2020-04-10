import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import flatten from "lodash/flatten.js"
import database from "../../database/index.js"
import { SONG_ARTISTS_FIELDS as fields } from "../../globals.js"

import {
  pipe,
  resolver,
  toDataUrl,
  removeDup,
  playSelect,
  songSelect,
  albumSelect,
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/index.js"

const {
  Play,
  Song,
  Album,
  UserArtist,
} = database.models

export default {
  photo: resolver(
    ({ parent }) => toDataUrl(parent.photo),
  ),
  songs: resolver(
    async ({ parent, info }) => {
      const { id: artistId } = parent

      const query = field =>
        Song.find({ [field]: artistId })
            .select(songSelect(info))
            .lean()
            .exec()

      const queries = Promise.all(fields.map(query))

      return pipe(await queries)(
        flatten,
        deserializeCollection,
        removeDup,
      )
    },
  ),
  albums: resolver(
    async ({ parent, info }) => {
      const { id: artistId } = parent

      const query =
        Album.find({ artists: artistId })
             .select(albumSelect(info))
             .lean()
             .exec()

      return deserializeCollection(await query)
    },
  ),
  plays: resolver(
    async ({ parent, args, info }) => {
      const { userId } = args
      const { id: artistId } = parent

      const songsQuery = field =>
        Song.find({ [field]: artistId })
            .select({ _id: 1 })
            .lean()
            .exec()

      const songsQueries = Promise.all(fields.map(songsQuery))

      const songs = pipe(await songsQueries)(
        flatten,
        deserializeCollection,
        removeDup,
      )

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
    async ({ args, parent }) => {
      const { userId } = args
      const { id: artistId } = parent

      const query =
        UserArtist.findOne({ user: userId, artist: artistId })
                  .select({ _id: 1 })
                  .lean()
                  .exec()
      
      const userArtist = await query

      if (isNull(userArtist)) {
        return null
      } else {
        return deserializeDocument(userArtist).dateCreated
      }
    },
  ),
  numOfPlays: resolver(
    async ({ parent, args, info }) => {
      const { userId } = args
      const { id: artistId } = parent

      const songsQuery =
        Song.find({ artist: artistId })
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
      const { id: artistId } = parent

      const query =
        UserArtist.findOne({
                    user: userId,
                    inLibrary: true,
                    artist: artistId,
                  })
                  .select({ inLibrary: 1 })
                  .lean()
                  .exec()
      
      const userArtist = await query

      if (isNull(userArtist)) {
        return false
      } else {
        return deserializeDocument(userArtist).inLibrary
      }
    },
  ),
}
