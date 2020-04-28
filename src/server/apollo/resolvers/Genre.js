import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import database from "../../database/index.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import { playSelect } from "../../helpers/mongodb/select.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../helpers/utilities/mapResolver.js"
import deserializeDocument from "../../helpers/mongodb/deserializeDocument.js"
import deserializeCollection from "../../helpers/mongodb/deserializeCollection.js"

import { SELECT_GENRE_SONGS } from "../../sql/index.js"

const {
  Play,
  Song,
  UserGenre,
} = database.models

const songs = async ({ parent }) =>
  sqlQuery({
    query: SELECT_GENRE_SONGS,
    parse: sqlParseTable,
    variables: [{
      key: "genreId",
      value: parent.genreId,
    }],
  })

const plays = async ({ parent, args, info }) => {
  const { userId } = args
  const { id: genreId } = parent

  const songsQuery =
    Song.find({ genres: genreId })
      .select({ _id: 1 })
      .lean()
      .exec()

  const ssongs = deserializeCollection(await songsQuery)
  const songsId = ssongs.map(({ id }) => id)

  const playQuery =
    Play.find({ user: userId, song: songsId })
      .select(playSelect(info))
      .lean()
      .exec()

  const pplays = deserializeCollection(await playQuery)

  if (isEmpty(pplays)) {
    return null
  } else {
    return plays
  }
}

const dateAdded = async ({ parent, args }) => {
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
}

const numOfPlays = async ({ parent, args, info }) => {
  const { userId } = args
  const { id: genreId } = parent

  const songsQuery =
    Song.find({ genres: genreId })
      .select({ _id: 1 })
      .lean()
      .exec()

  const ssongs = deserializeCollection(await songsQuery)
  const songsId = ssongs.map(({ id }) => id)

  const playQuery =
    Play.find({ user: userId, song: songsId })
      .select(playSelect(info))
      .lean()
      .exec()

  const pplays = deserializeCollection(await playQuery)

  if (isEmpty(plays)) {
    return null
  } else {
    return pplays.length
  }
}

const inLibrary = async ({ parent, args }) => {
  const { userId } = args
  const { id: genreId } = parent

  const query =
    UserGenre
      .findOne({
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
}

export default mapResolver({
  songs,
  plays,
  dateAdded,
  numOfPlays,
  inLibrary,
})
