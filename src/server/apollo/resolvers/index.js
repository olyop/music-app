import Play from "./Play.js"
import Song from "./Song.js"
import User from "./User.js"
import Album from "./Album.js"
import Genre from "./Genre.js"
import Query from "./Query.js"
import Artist from "./Artist.js"
import Playlist from "./Playlist.js"
import Mutation from "./Mutation/index.js"

import Uuid from "./customScalars/Uuid.js"
import Email from "./customScalars/Email.js"

const customScalars = {
  Uuid,
  Email,
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
  Mutation,
}

const resolvers = {
  ...customScalars,
  ...appInterfaces,
}

export default resolvers
