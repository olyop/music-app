import find from "lodash/find.js"
import keys from "lodash/keys.js"
import head from "lodash/head.js"
import last from "lodash/last.js"
import tail from "lodash/tail.js"
import map from "lodash/fp/map.js"
import concat from "lodash/concat.js"
import uniqBy from "lodash/uniqBy.js"
import initial from "lodash/initial.js"
import isEmpty from "lodash/isEmpty.js"
import filter from "lodash/fp/filter.js"
import reduce from "lodash/fp/reduce.js"
import { pipe } from "../helpers/misc.js"
import includes from "lodash/includes.js"
import concatFp from "lodash/fp/concat.js"
import graphqlFields from "graphql-fields"
import database from "../database/index.js"
import toInteger from "lodash/toInteger.js"

export const restoreOrder = ids => collection => ids.reduce(
  (acc, id) => concat(acc, find(collection, { id })),
  [],
)

export const removeDup = collection => uniqBy(collection, "id")

export const determineReleased = released => ((new Date(released)).getTime() / 1000) / 86400

export const determineDuration = duration => {
  const minutes = toInteger(duration.slice(0,1))
  const seconds = toInteger(duration.slice(2,4))
  return (minutes * 60) + seconds
}

export const determineSelect = Model => {
  const { paths } = Model.schema
  const topFields = pipe(paths)(keys, filter(field => field !== "true"))
  return (info, includeFields = []) => {
    return pipe(graphqlFields(info))(
      keys,
      map(field => field === "id" ? "_id" : field),
      filter(field => includes(topFields, field)),
      concatFp(includeFields),
      filter(field => field !== "_id"),
      reduce((fields, field) => ({ ...fields, [field]: 1 }), {}),
    )
  }
}

export const determineUserPrev = ({ prev, current, next, queue }) => {
  if (isEmpty(prev)) {
    return {}
  } else if (isEmpty(next)) {
    return {
      prev: initial(prev),
      current: last(prev),
      queue: concat(current, queue),
    }
  } else {
    return {
      prev: initial(prev),
      current: last(prev),
      next: concat(current, next),
    }
  }
}

export const determineUserNext = ({ prev, current, next, queue }) => {
  if (isEmpty(next) && isEmpty(queue)) {
    return {}
  } else if (isEmpty(next)) {
    return {
      prev: concat(prev, current),
      current: head(queue),
      queue: tail(queue),
    }
  } else {
    return {
      prev: concat(prev, current),
      current: head(next),
      next: tail(next),
    }
  }
}

const {
  User,
  Play,
  Song,
  Album,
  Genre,
  Artist,
  Playlist,
  UserSong,
  UserAlbum,
  UserArtist,
} = database.models

export const determineUserSelect = determineSelect(User)
export const determinePlaySelect = determineSelect(Play)
export const determineSongSelect = determineSelect(Song)
export const determineAlbumSelect = determineSelect(Album)
export const determineGenreSelect = determineSelect(Genre)
export const determineArtistSelect = determineSelect(Artist)
export const determinePlaylistSelect = determineSelect(Playlist)
export const determineUserSongSelect = determineSelect(UserSong)
export const determineUserAlbumSelect = determineSelect(UserAlbum)
export const determineUserArtistSelect = determineSelect(UserArtist)
