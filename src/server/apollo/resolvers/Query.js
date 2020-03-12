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
    async ({ info, args: { id } }) => await (
      Artist
        .findById(id)
        .select(determineArtistSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
  album: resolver(
    async ({ info, args: { id } }) => await (
      Album
        .findById(id)
        .select(determineAlbumSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
  genre: resolver(
    async ({ info, args: { id } }) => await (
      Genre
        .findById(id)
        .select(determineGenreSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
  song: resolver(
    async ({ info, args: { id } }) => await (
      Song
        .findById(id)
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
  user: resolver(
    async ({ info, args: { id } }) => await (
      User
        .findById(id)
        .select(determineUserSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
  artists: resolver(
    async ({ info }) => await (
      Artist
        .find()
        .sort({ name: "asc" })
        .select(determineArtistSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  albums: resolver(
    async ({ info }) => await (
      Album
        .find()
        .sort({ released: "desc" })
        .select(determineAlbumSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  genres: resolver(
    async ({ info }) => await (
      Genre
        .find()
        .sort({ name: "asc" })
        .select(determineGenreSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  songs: resolver(
    async ({ info }) => await (
      Song
        .find()
        .sort({ title: "asc" })
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
}
