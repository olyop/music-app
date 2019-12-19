import { Artist, Album, Genre, Song, User } from "../models/index.js"

import orderBy from "lodash/orderBy.js"
import { serializeCollection, serializeDocument } from "../../helpers/collection.js"

export default {
  artist: async (parent, { id }) => {
    const query = Artist.findById(id).lean().exec()
    const result = await query
    return serializeDocument(result)
  },
  album: async (parent, { id }) => {
    const query = Album.findById(id).lean().exec()
    const result = await query
    return serializeDocument(result)
  },
  genre: async (parent, { id }) => {
    const query = Genre.findById(id).lean().exec()
    const result = await query
    return serializeDocument(result)
  },
  song: async (parent, { id }) => {
    const query = Song.findById(id).lean().exec()
    const result = await query
    return serializeDocument(result)
  },
  user: async (parent, { id }) => {
    const query = User.findById(id).lean().exec()
    const result = await query
    return serializeDocument(result)
  },
  artists: async () => {
    const query = Artist.find().lean().exec()
    const result = await query
    const artists = serializeCollection(result)
    return orderBy(artists, "name", "asc")
  },
  albums: async () => {
    const query = Album.find().lean().exec()
    const result = await query
    const albums = serializeCollection(result)
    return orderBy(albums, "released", "desc")
  },
  genres: async () => {
    const query = Genre.find().lean().exec()
    const result = await query
    const genres = serializeCollection(result)
    return orderBy(genres, "name", "asc")
  },
  songs: async () => {
    const query = Song.find().lean().exec()
    const result = await query
    const songs = serializeCollection(result)
    return orderBy(songs, "title", "asc")
  },
  users: async () => {
    const query = User.find().lean().exec()
    const result = await query
    const songs = serializeCollection(result)
    return orderBy(songs, "name", "asc")
  }
}
