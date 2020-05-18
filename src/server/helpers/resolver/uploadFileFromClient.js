import concatStream from "../utils/concatStream.js"
import createStreamFromUpload from "./createStreamFromUpload.js"

const uploadFileFromClient = upload => new Promise(
  (resolve, reject) => {
    createStreamFromUpload(upload)
      .then(concatStream)
      .then(resolve)
      .catch(reject)
  },
)

export default uploadFileFromClient
