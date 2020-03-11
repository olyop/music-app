import mongoose from "mongoose"
import find from "lodash/find.js"
import keys from "lodash/keys.js"
import map from "lodash/fp/map.js"
import concat from "lodash/concat.js"
import uniqBy from "lodash/uniqBy.js"
import isEmpty from "lodash/isEmpty.js"
import isArray from "lodash/isArray.js"
import filter from "lodash/fp/filter.js"
import reduce from "lodash/fp/reduce.js"
import { pipe } from "../helpers/misc.js"
import includes from "lodash/includes.js"
import graphqlFields from "graphql-fields"
import database from "../database/index.js"
import mapValues from "lodash/mapValues.js"
import toInteger from "lodash/toInteger.js"

const {
  Play,
  Song,
  User,
  Album,
  Genre,
  Artist,
  Playlist,
  UserSong,
  UserAlbum,
  UserArtist,
} = database.models

const { ObjectId } = mongoose.Types

export const deserializeDocument = ({ _id, __v, ...doc }) => ({
  id: _id.toString(),
  ...mapValues(doc, val => {
    if (isArray(val) && !isEmpty(val)) {
      if (val[0] instanceof ObjectId) {
        return val.map(id => id.toString())
      } else {
        return val
      }
    } else {
      if (val instanceof ObjectId) {
        return val.toString()
      } else {
        return val
      }
    }
  }),
})

export const deserializeCollection = collection => collection.map(deserializeDocument)

export const restoreOrder = ids => collection => ids.reduce(
  (acc, id) => concat(
    acc,
    find(collection, { id }),
  ),
  [],
)

export const removeDup = collection => uniqBy(collection, "id")

export const determineReleased = released => ((new Date(released)).valueOf()) / 86400

export const determineDuration = duration => {
  const minutes = toInteger(duration.slice(0,1))
  const seconds = toInteger(duration.slice(2,4))
  return (minutes * 60) + seconds
}

export const determineSelect = Model => {
  const { paths } = Model.schema
  const topFields = pipe(paths)(keys, filter(field => field !== "true"))
  return info => {
    const fields = graphqlFields(info)
    return pipe(fields)(
      keys,
      map(field => field === "id" ? "_id" : field),
      filter(field => includes(topFields, field)),
      reduce((fields, field) => ({ ...fields, [field]: 1 }), {}),
    )
  }
}

export const determinePlaySelect = determineSelect(Play)
export const determineSongSelect = determineSelect(Song)
export const determineUserSelect = determineSelect(User)
export const determineAlbumSelect = determineSelect(Album)
export const determineGenreSelect = determineSelect(Genre)
export const determineArtistSelect = determineSelect(Artist)
export const determinePlaylistSelect = determineSelect(Playlist)
export const determineUserSongSelect = determineSelect(UserSong)
export const determineUserAlbumSelect = determineSelect(UserAlbum)
export const determineUserArtistSelect = determineSelect(UserArtist)
