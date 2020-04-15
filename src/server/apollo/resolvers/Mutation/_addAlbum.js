import fs from "fs"
import uuid from "uuid"
import { sql } from "../../../database/pg.js"
import { STORAGE_PATH_ALBUMS } from "../../../globals.js"

import {
  INSERT_ALBUM,
  INSERT_ALBUM_ARTIST,
} from "../../../sql/index.js"

import {
  resolver,
  parseSqlRow,
  determineReleased,
} from "../../../helpers/index.js"


const _addAlbum = async ({ args }) => {
  const albumId = uuid.v4()
  const { title, artists, cover } = args
  const released = determineReleased(args.released)

  const albumInsert =
    sql(INSERT_ALBUM, { title, albumId, released })

  const albumArtistInsert = artistId =>
    sql(INSERT_ALBUM_ARTIST, { albumId, artistId, albumArtistId: uuid.v4() })

  const albumArtistsInsert = artists.map(albumArtistInsert)

  const coverUpload =
    (await cover)
      .createReadStream()
      .pipe(fs.createWriteStream(STORAGE_PATH_ALBUMS))

  const [ album ] = await Promise.all([ albumInsert, albumArtistsInsert, coverUpload ])

  return parseSqlRow(album)
}

export default resolver(_addAlbum)
