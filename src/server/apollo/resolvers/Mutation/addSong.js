import {
  isSong,
  resolver,
  parseSqlRow,
  awsCatalogKey,
} from "../../../helpers/index.js"

import {
  INSERT_SONG,
  INSERT_SONG_GENRE,
  INSERT_SONG_ARTIST,
  INSERT_SONG_REMIXER,
  INSERT_SONG_FEATURING,
} from "../../../sql/index.js"

import ApolloServerExpress from "apollo-server-express"

import uuid from "uuid"
import s3 from "../../../s3.js"
import mp3Duration from "mp3-duration"
import { sql } from "../../../database/pg.js"
import { AWS_S3_ACL, AWS_S3_BUCKET } from "../../../globals.js"

const { UserInputError } = ApolloServerExpress

const addSong = async ({ args }) => {

  // upload audio
  let chunks = []
  const stream = await args.audio
  const upload = stream.createReadStream()
  for await (const chunk of upload) chunks.push(chunk)
  const audio = Buffer.concat(chunks)

  // data validation
  if (!isSong({ ...args, audio })) {
    throw new UserInputError("Invalid arguments.")
  }

  const {
    mix,
    title,
    genres,
    albumId,
    artists,
    remixers,
    featuring,
    discNumber,
    trackNumber,
  } = args

  const songId = uuid.v4()
  const duration = Math.ceil(await mp3Duration(audio))

  const songInsert =
    sql({
      query: INSERT_SONG,
      parse: parseSqlRow,
      args: {
        mix,
        title,
        songId,
        albumId,
        duration,
        discNumber,
        trackNumber,
      },
    })

  const songGenreInsert = (genreId, genreIndex) =>
    sql({
      query: INSERT_SONG_GENRE,
      args: {
        songId,
        genreId,
        genreIndex,
        songGenreId: uuid.v4(),
      },
    })

  const songArtistInsert = (artistId, artistIndex) =>
    sql({
      query: INSERT_SONG_ARTIST,
      args: {
        songId,
        artistId,
        artistIndex,
        songArtistId: uuid.v4(),
      },
    })
  
  const songRemixerInsert = (artistId, artistIndex) =>
    sql({
      query: INSERT_SONG_REMIXER,
      args: {
        songId,
        artistId,
        artistIndex,
        songRemixerId: uuid.v4(),
      },
    })
  
  const songFeaturingInsert = (artistId, artistIndex) =>
    sql({
      query: INSERT_SONG_FEATURING,
      args: {
        songId,
        artistId,
        artistIndex,
        songFeaturingId: uuid.v4(),
      },
    })

  const songGenresInserts = genres.map(songGenreInsert)
  const songArtistsInserts = artists.map(songArtistInsert)
  const songRemixersInserts = remixers.map(songRemixerInsert)
  const songFeaturingInserts = featuring.map(songFeaturingInsert)

  const audioUpload =
    s3.upload({
      Body: audio,
      ACL: AWS_S3_ACL,
      Bucket: AWS_S3_BUCKET,
      Key: awsCatalogKey(songId),
    }).promise()

  const song = await songInsert
  await Promise.all(songGenresInserts)
  await Promise.all(songArtistsInserts)
  await Promise.all(songRemixersInserts)
  await Promise.all(songFeaturingInserts)
  await audioUpload

  return song
}

export default resolver(addSong)
