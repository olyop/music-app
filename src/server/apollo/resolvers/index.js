import Uuid from "./Uuid.js"
import Email from "./Email.js"
import Json from "graphql-type-json"

import Play from "./Play.js"
import Song from "./Song.js"
import User from "./User.js"
import Album from "./Album.js"
import Genre from "./Genre.js"
import Artist from "./Artist.js"
import Playlist from "./Playlist.js"

import Query from "./Query/index.js"
import Mutation from "./Mutation/index.js"

const customScalars = {
  Uuid,
  Json,
  Email,
}

const rootInterfaces = {
  Query,
  Mutation,
}

const appInterfaces = {
  Play,
  User,
  Song,
  Query,
  Genre,
  Album,
  Artist,
  Playlist,
}

const resolvers = {
  ...customScalars,
  ...appInterfaces,
  ...rootInterfaces,
}

export default resolvers
