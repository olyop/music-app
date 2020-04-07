import database from "../../../database/index.js"

import {
  resolver,
  determineReleased,
  deserializeDocument,
} from "../../../helpers/index.js"

const { Album } = database.models

const addAlbum = async ({ args }) => {
  const { cover, released, ...fields } = args

  const upload = await cover

  // upload cover
  let chunks = []
  const stream = upload.createReadStream()
  for await (const chunk of stream) chunks.push(chunk)
  const coverBuffer = Buffer.concat(chunks)

  // create in database
  const doc = await Album.create({
    ...fields,
    cover: coverBuffer,
    released: determineReleased(released),
  })
  
  return deserializeDocument(doc.toObject())
}

export default resolver(addAlbum)
