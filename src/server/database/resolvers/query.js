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
      const query = Genre.find()
      const genres = await query.sort("name").lean().exec()
      return serializeCollection(genres)
    }
  ),
  songs: resolver(
    async () => {
      const query = Song.find()
      const songs = await query.sort("title").lean().exec()
      return serializeCollection(songs)
    }
  ),
  users: resolver(
    async () => {
      const query = User.find()
      const users = await query.sort("name").lean().exec()
      return serializeCollection(users)
    }
  ),
}
