import keys from "lodash/keys.js"
import map from "lodash/fp/map.js"
import pipe from "../utils/pipe.js"
import filter from "lodash/fp/filter.js"
import reduce from "lodash/fp/reduce.js"
import includes from "lodash/includes.js"
import concatFp from "lodash/fp/concat.js"
import graphqlFields from "graphql-fields"
import database from "../../database/index.js"

const {
  User,
  Play,
  Song,
  Album,
  Genre,
  Artist,
  Playlist,
} = database.models

const select = Model => {
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

export const userSelect = select(User)
export const playSelect = select(Play)
export const songSelect = select(Song)
export const albumSelect = select(Album)
export const genreSelect = select(Genre)
export const artistSelect = select(Artist)
export const playlistSelect = select(Playlist)
