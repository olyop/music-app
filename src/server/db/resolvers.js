const queryResolver = require("./resolvers/query")
const artistResolver = require("./resolvers/artist")
const albumResolver = require("./resolvers/album")
const songResolver = require("./resolvers/song")

const resolvers = {
  Query: queryResolver,
  Artist: artistResolver,
  Album: albumResolver,
  Song: songResolver
}

module.exports = resolvers
