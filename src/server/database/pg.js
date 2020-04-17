import {
  TABLE_PLAYS,
  TABLE_SONGS,
  TABLE_USERS,
  TABLE_ALBUMS,
  TABLE_GENRES,
  TABLE_ARTISTS,
  TABLE_PLAYLISTS,
  TABLE_USERS_NEXTS,
  TABLE_USERS_PREVS,
  TABLE_USERS_SONGS,
  TABLE_USERS_ALBUMS,
  TABLE_USERS_GENRES,
  TABLE_USERS_QUEUES,
  TABLE_SONGS_ARTISTS,
  TABLE_USERS_ARTISTS,
  TABLE_ALBUMS_ARTISTS,
  TABLE_SONGS_REMIXERS,
  TABLE_PLAYLISTS_SONGS,
  TABLE_SONGS_FEATURING,
  TABLE_USERS_PLAYLISTS,
} from "../sql/index.js"

import pg from "pg"
import yesql from "yesql"
import { PG_CONFIG } from "../globals.js"
import { pipe, convertToSnakeCase } from "../helpers/index.js"

const pool = new pg.Pool(PG_CONFIG)

export const sql = (query, args = {}) => pipe(args)(
  convertToSnakeCase,
  params => yesql.pg(query)(params),
  ({ text, values }) => pool.query(text, values),
)

const queries = [
  TABLE_ARTISTS,
  TABLE_GENRES,
  TABLE_ALBUMS,
  TABLE_ALBUMS_ARTISTS,
  TABLE_SONGS,
  TABLE_SONGS_ARTISTS,
  TABLE_SONGS_REMIXERS,
  TABLE_SONGS_FEATURING,
  TABLE_USERS,
  TABLE_USERS_NEXTS,
  TABLE_USERS_PREVS,
  TABLE_USERS_SONGS,
  TABLE_USERS_ALBUMS,
  TABLE_USERS_GENRES,
  TABLE_USERS_QUEUES,
  TABLE_USERS_ARTISTS,
  TABLE_PLAYLISTS,
  TABLE_PLAYLISTS_SONGS,
  TABLE_USERS_PLAYLISTS,
  TABLE_PLAYS,
]

queries.reduce(
  async (prev, next) => {
    await prev
    return sql(next)
  },
  Promise.resolve(),
)
