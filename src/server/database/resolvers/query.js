import { Artist, Album, Genre, Song, User } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeCollection, serializeDocument } from "../../helpers/collection.js"

export default {
  artist: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Artist.findById(id).lean()
      const doc = await query.exec()
      return serializeDocument(doc)
    }
  ),
  album: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Album.findById(id).lean()
      const doc = await query.exec()
      return serializeDocument(doc)
    }
  ),
  genre: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Genre.findById(id).lean()
      const doc = await query.exec()
      return serializeDocument(doc)
    }
  ),
  song: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Song.findById(id).lean()
      const doc = await query.exec()
      return serializeDocument(doc)
    }
  ),
  user: resolver(
    async ({ args }) => {
      const { id } = args
      const query = User.findById(id).lean()
      const doc = await query.exec()
      return serializeDocument(doc)
    }
  ),
  artists: resolver(
    async () => {
      const sortArgs = { name: "asc" }
      const query = Artist.find().sort(sortArgs).lean()
      const collection = await query.exec()
      return serializeCollection(collection)
    }
  ),
  albums: resolver(
    async () => {
      const sortArgs = { released: "desc" }
      const query = Album.find().sort(sortArgs).lean()
      const collection = await query.exec()
      return serializeCollection(collection)
    }
  ),
  genres: resolver(
    async () => {
      const sortArgs = { name: "asc" }
      const query = Genre.find().sort(sortArgs).lean()
      const collection = await query.exec()
      return serializeCollection(collection)
    }
  ),
  songs: resolver(
    async () => {
      const sortArgs = { title: "asc" }
      const query = Song.find().sort(sortArgs).lean()
      const collection = await query.exec()
      return serializeCollection(collection)
    }
  ),
  users: resolver(
    async () => {
      const sortArgs = { name: "asc" }
      const query = User.find().sort(sortArgs).lean()
      const collection = await query.exec()
      return serializeCollection(collection)
    }
  ),
}
