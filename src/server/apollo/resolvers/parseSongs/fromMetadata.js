import sum from "lodash/sum.js"
import uniq from "lodash/uniq.js"
import albumReleased from "./albumReleased.js"
import calculateMode from "../../../helpers/utils/calculateMode.js"

export const songsFromMetadata = metadata =>
  metadata.map(({ album, ...song }) => song)

const albumKeyMode = songs => key => {
  const arr = songs.map(({ album }) => album[key])
  return Array.isArray(arr[0]) ? uniq(arr)[0] : calculateMode(arr)
}

export const albumFromMetadata = metadata => new Promise(
  (resolve, reject) => {
    const album = {
      title: albumKeyMode(metadata)("title"),
      cover: albumKeyMode(metadata)("cover"),
      artists: albumKeyMode(metadata)("artists"),
      released: albumKeyMode(metadata)("released"),
      duration: sum(metadata.map(({ duration }) => duration)),
    }
    albumReleased(album)
      .then(released => resolve({
        ...album,
        released,
      }))
      .catch(reject)
  },
)
