import mm from "music-metadata"
import parseMetadata from "./parseMetadata.js"

const parseFile = file => new Promise(
  (resolve, reject) => {
    mm.parseBuffer(file)
      .then(parseMetadata)
      .then(resolve)
      .catch(reject)
  },
)

export default parseFile
