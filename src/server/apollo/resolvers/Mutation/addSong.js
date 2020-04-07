import s3 from "../../../s3.js"
import mp3Duration from "mp3-duration"
import { S3_BUCKET } from "../../../globals.js"
import database from "../../../database/index.js"
import { resolver, deserializeDocument } from "../../../helpers/index.js"

const { Song } = database.models

const addSong = async ({ args }) => {
  const { audio, ...fields } = args
  const upload = await audio

  // upload audio
  let chunks = []
  const stream = upload.createReadStream()
  for await (const chunk of stream) chunks.push(chunk)
  const buffer = Buffer.concat(chunks)

  const duration = await mp3Duration(buffer)

  // create in database
  const doc = await Song.create({
    ...fields,
    duration: Math.ceil(duration),
  })

  const song = deserializeDocument(doc.toObject())

  // upload to s3
  await s3.upload({
    Body: buffer,
    Bucket: S3_BUCKET,
    ACL: "public-read",
    Key: `songs/${song.id}.mp3`
  }).promise()

  return song
}

export default resolver(addSong)
