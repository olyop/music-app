import {
  resolver,
  parseSqlRow,
  isSongValid,
  awsCatalogKey,
} from "../../../helpers/index.js"

import {
  INSERT_SONG,
  INSERT_SONG_GENRE,
  INSERT_SONG_ARTIST,
  INSERT_SONG_REMIXER,
  INSERT_SONG_FEATURING,
} from "../../../sql/index.js"

import uuid from "uuid"
import s3 from "../../../s3.js"
import mp3Duration from "mp3-duration"
import { sql } from "../../../database/pg.js"
import { AWS_S3_BUCKET } from "../../../globals.js"

const addSong = async ({ args }) => {

  // upload audio
  let chunks = []
  const stream = await args.audio
  const upload = stream.createReadStream()
  for await (const chunk of upload) chunks.push(chunk)
  const audio = Buffer.concat(chunks)

  // data validation
  if (!isSongValid({ ...args, audio })) {
    throw "Invalid data."
  }

  const {
    mix,
    title,
    album,
    genres,
    artists,
    remixers,
    featuring,
    discNumber,
    trackNumber,
  } = args

  const songId = uuid.v4()
  const duration = Math.ceil(await mp3Duration(audio))

  const songInsert =
    sql(INSERT_SONG, {
      mix,
      title,
      songId,
      duration,
      discNumber,
      trackNumber,
      albumId: album,
    })

  const songGenreInsert = (genreId, genreIndex) =>
    sql(INSERT_SONG_GENRE, {
      songId,
      genreId,
      genreIndex,
      songGenreId: uuid.v4(),
    })

  const songArtistInsert = (artistId, artistIndex) =>
    sql(INSERT_SONG_ARTIST, {
      songId,
      artistId,
      artistIndex,
      songArtistId: uuid.v4(),
    })
  
  const songRemixerInsert = (artistId, artistIndex) =>
    sql(INSERT_SONG_REMIXER, {
      songId,
      artistId,
      artistIndex,
      songRemixerId: uuid.v4(),
    })
  
  const songFeaturingInsert = (artistId, artistIndex) =>
    sql(INSERT_SONG_FEATURING, {
      songId, 
      artistId,
      artistIndex,
      songFeaturingId: uuid.v4(),
    })

  const songGenresInserts = genres.map(songGenreInsert)
  const songArtistsInserts = artists.map(songArtistInsert)
  const songRemixersInserts = remixers.map(songRemixerInsert)
  const songFeaturingInserts = featuring.map(songFeaturingInsert)

  const audioUpload =
    s3.upload({
      Body: audio,
      ACL: "private",
      Bucket: AWS_S3_BUCKET,
      Key: awsCatalogKey(songId),
    }).promise()
  
  const [ song ] = await Promise.all([
    songInsert,
    audioUpload,
    ...songGenresInserts,
    ...songArtistsInserts,
    ...songRemixersInserts,
    ...songFeaturingInserts,
  ])

  return parseSqlRow(song)
}

export default resolver(addSong)
