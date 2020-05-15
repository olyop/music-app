const concatStream = stream => new Promise(
  (resolve, reject) => {
    const chunks = []
    stream
      .on("data", chunk => chunks.push(chunk))
      .on("end", () => resolve(Buffer.concat(chunks)))
      .on("error", reject)
  },
)

export default concatStream
