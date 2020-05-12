import { isFileValidType, isFileValidSize } from "./common"
import { parseBlob as getAudioId3 } from "music-metadata-browser"

const createFile = file =>
  new Promise(
    (resolve, reject) => {
      if (file instanceof File) {
        if (!isFileValidType(file)) {
          reject(new Error("Invalid file type"))
        } else if (!isFileValidSize(file)) {
          reject(new Error("File to large."))
        } else {
          getAudioId3(file)
            .then(id3 => resolve({ id3, audio: file }))
            .catch(reject)
        }
      } else {
        reject(new Error("Input not of type File"))
      }
    },
  )

export default createFile
