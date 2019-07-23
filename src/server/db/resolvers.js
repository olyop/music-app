const { Artist, Album, Song } = require("./models")

const { serializeDocument, serializeCollection, sortCollection } = require("../helpers/collection")
const { pipe } = require("../helpers/misc")

const resolvers = {
  Query: {
    artist: async (_parent, { id }) => (
      serializeDocument(await Artist.findById(id).exec())
    ),
    album: async (_parent, { id }) => (
      serializeDocument(await Album.findById(id).exec())
    ),
    song: async (_parent, { id }) => (
      serializeDocument(await Song.findById(id).exec())
    ),
    artists: async () => (
      pipe(await Artist.find({}).exec())(
        serializeCollection,
        sortCollection("name")
      )
    ),
    albums: async () => (
      pipe(await Album.find({}).exec())(
        serializeCollection,
        sortCollection("title")
      )
    ),
    songs: async () => (
      pipe(await Song.find({}).exec())(
        serializeCollection,
        sortCollection("title")
      )
    )
  },
  Artist: {
    albums: async ({ id }) => (
      pipe(await Album.find({ artist: id }).exec())(
        serializeCollection,
        sortCollection("title")
      )
    ),
    songs: async ({ id }) => (
      pipe(await Song.find({ artist: id }).exec())(
        serializeCollection,
        sortCollection("title")
      )
    )
  },
  Album: {
    artist: async ({ artist }) => (
      serializeDocument(await Artist.findById(artist).exec())
    ),
    songs: async ({ id }) => (
      pipe(await Song.find({ album: id }).exec())(
        serializeCollection,
        sortCollection("title")
      )
    )
  },
  Song: {
    artist: async ({ artist }) => (
      serializeDocument(await Artist.findById(artist).exec())
    ),
    album: async ({ album }) => (
      serializeDocument(await Album.findById(album).exec())
    )
  }
}

module.exports = resolvers
