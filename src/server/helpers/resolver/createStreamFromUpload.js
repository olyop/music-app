const createStreamFromUpload = upload => new Promise(
  (resolve, reject) => {
    upload
      .then(file => file.createReadStream())
      .then(resolve)
      .catch(reject)
  },
)

export default createStreamFromUpload
