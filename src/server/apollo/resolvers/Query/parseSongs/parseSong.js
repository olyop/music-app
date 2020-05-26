import mm from "music-metadata"
import parseMetadata from "./parseMetadata.js"
import createStreamFromUpload from "../../../../helpers/resolver/createStreamFromUpload.js"

const parseSong = upload => new Promise(
  (resolve, reject) => {
    createStreamFromUpload(upload)
      .then(mm.parseStream)
      .then(parseMetadata)
      .then(resolve)
      .catch(reject)
  },
)

export default parseSong
