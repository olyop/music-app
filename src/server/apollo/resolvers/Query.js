import {
  SELECT_NOW,
  SELECT_SONG,
  SELECT_ALBUM,
  SELECT_GENRE,
  SELECT_ALBUMS,
  SELECT_PLAYLIST,
  SELECT_SONGS,
  SELECT_ARTIST,
  SELECT_GENRES,
  SELECT_ARTISTS,
  SELECT_PLAYLISTS,
} from "../../sql/index.js"

import ComplexQueries from "./ComplexQueries/index.js"

import { sql } from "../../database/pg.js"
import { resolver } from "../../helpers/index.js"
import { compose, parseSqlRow, parseSqlTable } from "../../helpers/index.js"

export default {

  ...ComplexQueries,

  now: async () => compose(
    await sql(SELECT_NOW),
    ({ rows }) => rows[0].now.getTime(),
    time => time / 1000,
    Math.floor,
  ),

  songs: resolver(async () => parseSqlTable(await sql(SELECT_SONGS))),
  albums: resolver(async () => parseSqlTable(await sql(SELECT_ALBUMS))),
  genres: resolver(async () => parseSqlTable(await sql(SELECT_GENRES))),
  artists: resolver(async () => parseSqlTable(await sql(SELECT_ARTISTS))),
  playlists: resolver(async () => parseSqlTable(await sql(SELECT_PLAYLISTS))),
  user: resolver(async ({ args }) => parseSqlRow(await sql(SELECT_USER, args))),
  play: resolver(async ({ args }) => parseSqlRow(await sql(SELECT_PLAY, args))),
  song: resolver(async ({ args }) => parseSqlRow(await sql(SELECT_SONG, args))),
  album: resolver(async ({ args }) => parseSqlRow(await sql(SELECT_ALBUM, args))),
  genre: resolver(async ({ args }) => parseSqlRow(await sql(SELECT_GENRE, args))),
  artist: resolver(async ({ args }) => parseSqlRow(await sql(SELECT_ARTIST, args))),
  playlist: resolver(async ({ args }) => parseSqlRow(await sql(SELECT_PLAYLIST, args))),

}
