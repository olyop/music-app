import Uuid from "./customScalars/Uuid.js"
import Email from "./customScalars/Email.js"

import Play from "./appInterfaces/Play.js"
import Song from "./appInterfaces/Song.js"
import User from "./appInterfaces/User.js"
import Album from "./appInterfaces/Album.js"
import Genre from "./appInterfaces/Genre.js"
import Artist from "./appInterfaces/Artist.js"
import Playlist from "./appInterfaces/Playlist.js"

import Query from "./rootInterfaces/Query.js"
import Mutation from "./rootInterfaces/Mutation/index.js"

const customScalars = {
  Uuid,
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
