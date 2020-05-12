import createFile from "./createFile"

const createFiles = fileList =>
  new Promise(
    (resolve, reject) => {
      if (fileList instanceof FileList) {
        Promise
          .all(Array.from(fileList).map(createFile))
          .then(resolve)
          .catch(reject)
      } else {
        reject(new Error("Invalid input FileList", fileList))
      }
    },
  )

export default createFiles
