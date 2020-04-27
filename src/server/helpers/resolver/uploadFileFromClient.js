import concatStream from "../utilities/concatStream.js"

const createReadableStream = upload => new Promise(
  (resolve, reject) => {
    upload
      .then(file => resolve(file.createReadStream()))
      .catch(reject)
  },
)

const uploadFileFromClient = upload => new Promise(
  (resolve, reject) => {
    createReadableStream(upload)
      .then(concatStream)
      .then(resolve)
      .catch(reject)
  },
)

export default uploadFileFromClient
