import fs from "fs"
import path from "path"
import uuid from "uuid"
import { sql } from "../../../database/pg.js"
import { INSERT_ARTIST } from "../../../sql/index.js"
import { STORAGE_PATH_ARTISTS } from "../../../globals.js"
import { resolver, parseSqlRow } from "../../../helpers/index.js"


const _addArtist = async ({ args }) => {
  const artistId = uuid.v4()
  const { name, photo } = args

  const artistInsert =
    sql(INSERT_ARTIST, { artistId, name })

  const photoUpload = 
    (await photo)
      .createReadStream()
      .pipe(fs.createWriteStream(path.join(STORAGE_PATH_ARTISTS, `${artistId}.jpg`)))

  const [ artist ] = await Promise.all([ artistInsert, photoUpload ])

  return parseSqlRow(artist)
}

export default resolver(_addArtist)
