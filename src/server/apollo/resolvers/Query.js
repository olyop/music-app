import { sql } from "../../database/pg.js"
import database from "../../database/index.js"
import { parseSqlRow, parseSqlTable } from "../../helpers/index.js"

import { GET_ALBUM, GET_ALBUMS } from "../../sql/index.js"

import ComplexQueries from "./ComplexQueries/index.js"

import {
  resolver,
  playSelect,
  userSelect,
  songSelect,
  albumSelect,
  genreSelect,
  artistSelect,
  playlistSelect,
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/index.js"

const {
  User,
  Play,
  Song,
  Album,
  Genre,
  Artist,
  Playlist,
} = database.models

export default {

  _albums: resolver(async () => parseSqlTable(await sql(GET_ALBUMS))),
  _album: resolver(async ({ args }) => parseSqlRow(await sql(GET_ALBUM, args))),

  ...ComplexQueries,

  songs: resolver(
    async ({ info }) => {
      const query =
        Song.find()
            .select(songSelect(info))
            .lean()
            .exec()
      return deserializeCollection(await query)
    },
  ),
  albums: resolver(
    async ({ info }) => {
      const query =
        Album.find()
             .sort({ released: "desc" })
             .select(albumSelect(info))
             .lean()
             .exec()
      return deserializeCollection(await query)
    },
  ),
  genres: resolver(
    async ({ info }) => {
      const query =
        Genre.find()
             .select(genreSelect(info))
             .lean()
             .exec()
      return deserializeCollection(await query)
    },
  ),
  artists: resolver(
    async ({ info }) => {
      const query =
        Artist.find()
              .select(artistSelect(info))
              .lean()
              .exec()
      return deserializeCollection(await query)
    },
  ),
  playlists: resolver(
    async ({ info }) => {
      const query =
        Playlist.find()
                .select(playlistSelect(info))
                .lean()
                .exec()
      return deserializeCollection(await query)
    }
  ),
  user: resolver(
    async ({ args, info }) => {
      const query =
        User.findById(args.userId)
            .select(userSelect(info))
            .lean()
            .exec()

      return deserializeDocument(await query)
    },
  ),
  play: resolver(
    async ({ args, info }) => {
      const query =
        Play.findById(args.playId)
            .select(playSelect(info))
            .lean()
            .exec()
      return deserializeDocument(await query)
    },
  ),
  song: resolver(
    async ({ args, info }) => {
      const query =
        Song.findById(args.songId)
            .select(songSelect(info))
            .lean()
            .exec()
      return deserializeDocument(await query)
    },
  ),
  album: resolver(
    async ({ args, info }) => {
      const query =
        Album.findById(args.albumId)
             .select(albumSelect(info))
             .lean()
             .exec()
      return deserializeDocument(await query)
    },
  ),
  genre: resolver(
    async ({ args, info }) => {
      const query =
        Genre.findById(args.genreId)
             .select(genreSelect(info))
             .lean()
             .exec()
      return deserializeDocument(await query)
    },
  ),
  artist: resolver(
    async ({ args, info }) => {
      const query =
        Artist.findById(args.artistId)
              .select(artistSelect(info))
              .lean()
              .exec()
      return deserializeDocument(await query)
    },
  ),
  playlist: resolver(
    async ({ args, info }) => {
      const query =
        Playlist.findById(args.playlistId)
                .select(playlistSelect(info))
                .lean()
                .exec()
      return deserializeDocument(await query)
    },
  ),
}
