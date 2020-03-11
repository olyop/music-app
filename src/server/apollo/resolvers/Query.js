import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  deserializeDocument,
  determineUserSelect,
  determineSongSelect,
  determineAlbumSelect,
  determineGenreSelect,
  determineArtistSelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { Song, User, Album, Genre, Artist } = database.models

export default {
  artist: resolver(
    async ({ info, args: { id } }) => {
      const query = Artist.findById(id)
      const select = determineArtistSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    }
  ),
  album: resolver(
    async ({ info, args: { id } }) => {
      const query = Album.findById(id)
      const select = determineAlbumSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    }
  ),
  genre: resolver(
    async ({ info, args: { id } }) => {
      const query = Genre.findById(id)
      const select = determineGenreSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    }
  ),
  song: resolver(
    async ({ info, args: { id } }) => {
      const query = Song.findById(id)
      const select = determineSongSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    }
  ),
  user: resolver(
    async ({ info, args: { id } }) => {
      const query = User.findById(id)
      const select = determineUserSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    }
  ),
  artists: resolver(
    async ({ info }) => {
      const sortArgs = { name: "asc" }
      const query = Artist.find().sort(sortArgs)
      const select = determineArtistSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
  albums: resolver(
    async ({ info }) => {
      const sortArgs = { released: "desc" }
      const query = Album.find().sort(sortArgs)
      const select = determineAlbumSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
  genres: resolver(
    async ({ info }) => {
      const sortArgs = { name: "asc" }
      const query = Genre.find().sort(sortArgs)
      const select = determineGenreSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
  songs: resolver(
    async ({ info }) => {
      const sortArgs = { title: "asc" }
      const query = Song.find().sort(sortArgs)
      const select = determineSongSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
}
