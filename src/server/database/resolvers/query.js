import { Artist, Album, Genre, Song, User } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeCollection, serializeDocument } from "../../helpers/collection.js"

export default {
  artist: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Artist.findById(id)
      const artist = await query.lean().exec()
      return serializeDocument(artist)
    }
  ),
  album: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Album.findById(id)
      const album = await query.lean().exec()
      return serializeDocument(album)
    }
  ),
  genre: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Genre.findById(id)
      const genre = await query.lean().exec()
      return serializeDocument(genre)
    }
  ),
  song: resolver(
    async ({ args }) => {
      const { id } = args
      const query = Song.findById(id)
      const song = await query.lean().exec()
      return serializeDocument(song)
    }
  ),
  user: resolver(
    async ({ args }) => {
      const { id } = args
      const query = User.findById(id)
      const user = await query.lean().exec()
      return serializeDocument(user)
    }
  ),
  artists: resolver(
    async () => {
      const query = Artist.find()
      const artists = await query.sort("name").lean().exec()
      return serializeCollection(artists)
    }
  ),
  albums: resolver(
    async () => {
      const query = Album.find()
      const albums = await query.sort("-released").lean().exec()
      return serializeCollection(albums)
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
