import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { Artist } = database.models

const addArtist = async ({ args }) => {
  const { photo, ...fields } = args
  const upload = await photo

  // upload photo
  let chunks = []
  const stream = upload.createReadStream()
  for await (const chunk of stream) chunks.push(chunk)
  const photoBuffer = Buffer.concat(chunks)

  // create in database
  const doc = await Artist.create({
    ...fields,
    photo: photoBuffer,
  })

  return deserializeDocument(doc.toObject())
}

export default resolver(addArtist)
