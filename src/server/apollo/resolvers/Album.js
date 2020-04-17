import {
  resolver,
  toDataUrl,
  playSelect,
  parseSqlTable,
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/index.js"

import {
  SELECT_ALBUM_SONGS,
  SELECT_ALBUM_ARTISTS,
} from "../../sql/index.js"

import s3 from "../../s3.js"
import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import { sql } from "../../database/pg.js"
import database from "../../database/index.js"

const {
  Play,
  Song,
  UserAlbum,
} = database.models

export default {

  cover: resolver(
    async ({ parent: { albumId }, args: { size } }) => (
      toDataUrl(await
        s3.getObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `catalog/${albumId}_${size}.jpg`,
        }).promise()
      )
    ),
  ),

  songs: resolver(
    async ({ parent: albumId }) => (
      parseSqlTable(await sql(SELECT_ALBUM_SONGS, { albumId }))
    ),
  ),

  artists: resolver(
    async ({ parent: albumId }) => (
      parseSqlTable(await sql(SELECT_ALBUM_ARTISTS, { albumId }))
    ),
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
        return false
      } else {
        return deserializeDocument(userAlbum).inLibrary
      }
    },
  ),
}
