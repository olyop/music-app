import NodeID3 from "node-id3"
import mp3Duration from "mp3-duration"
import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { Song } = database.models

const addSong = async ({ args }) => {
  const { audio, ...fields } = args
  const upload = await audio

  // upload audio
  let chunks = []
  const stream = upload.createReadStream()
  for await (const chunk of stream) chunks.push(chunk)
  const audioFile = Buffer.concat(chunks)

  const duration = await mp3Duration(audioFile)
  const audioBuffer = NodeID3.removeTagsFromBuffer(audioFile)

  // create in database
  const doc = await Song.create({
    ...fields,
    audio: audioBuffer,
    duration: Math.floor(duration),
  })

  return deserializeDocument(doc.toObject())
}

export default resolver(addSong)
