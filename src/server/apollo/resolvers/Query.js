import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determineUserSelect,
  determineSongSelect,
  determineAlbumSelect,
  determineGenreSelect,
  determineArtistSelect,
} from "../../helpers/resolvers.js"

import {
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/collections.js"

const {
  Song,
  User,
  Album,
  Genre,
  Artist,
} = database.models

export default {
  artist: resolver(
    async ({ info, args: { id } }) => {
      const query =
        Artist
          .findById(id)
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  album: resolver(
    async ({ info, args: { id } }) => {
      const query =
        Album
          .findById(id)
          .select(determineAlbumSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  genre: resolver(
    async ({ info, args: { id } }) => {
      const query =
        Genre
          .findById(id)
          .select(determineGenreSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  song: resolver(
    async ({ info, args: { id } }) => {
      const query =
        Song
          .findById(id)
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  user: resolver(
    async ({ info, args: { id } }) => {
      const query =
        User
          .findById(id)
          .select(determineUserSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  artists: resolver(
    async ({ info }) => {
      const query =
        Artist
          .find()
          .sort({ name: "asc" })
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  albums: resolver(
    async ({ info }) => {
      const query =
        Album
          .find()
          .sort({ title: "asc" })
          .select(determineAlbumSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  genres: resolver(
    async ({ info }) => {
      const query =
        Genre
          .find()
          .sort({ name: "asc" })
          .select(determineGenreSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  songs: resolver(
    async ({ info }) => {
      const query =
        Song
          .find()
          .sort({ title: "asc" })
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
}
