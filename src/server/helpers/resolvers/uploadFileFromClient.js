const createReadableStream = upload => new Promise(
  (resolve, reject) => {
    upload
      .then(file => resolve(file.createReadStream()))
      .catch(reject)
  },
)

const concatStream = stream => new Promise(
  (resolve, reject) => {
    const chunks = []
    stream
      .on("data", chunk => chunks.push(chunk))
      .on("end", () => resolve(Buffer.concat(chunks)))
      .on("error", reject)
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
