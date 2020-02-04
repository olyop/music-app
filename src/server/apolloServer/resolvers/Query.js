import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"
import { serializeCollection, serializeDocument } from "../../helpers/collection.js"

const { Song, User, Album, Genre, Artist } = database.models

export default {
  artist: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Artist.findById(id)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
  album: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Album.findById(id)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
  genre: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Genre.findById(id)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
  song: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Song.findById(id)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
  user: resolver(
    async ({ args }) => {
      const { id } = args
      const query = User.findById(id)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
  artists: resolver(
    async () => {
      const sortArgs = { name: "asc" }
      const query = Artist.find().sort(sortArgs)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  albums: resolver(
    async () => {
      const sortArgs = { released: "desc" }
      const query = Album.find().sort(sortArgs)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  genres: resolver(
    async () => {
      const sortArgs = { name: "asc" }
      const query = Genre.find().sort(sortArgs)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  songs: resolver(
    async () => {
      const sortArgs = { title: "asc" }
      const query = Song.find().sort(sortArgs)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
}
