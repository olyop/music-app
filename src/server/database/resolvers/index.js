const Query = require("./query")
const Mutation = require("./mutation")
const Artist = require("./artist")
const Album = require("./album")
const Song = require("./song")

const resolvers = {
  Query,
  Mutation,
  Artist,
  Album,
  Song
}

module.exports = resolvers
