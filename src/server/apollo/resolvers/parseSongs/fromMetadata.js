import uniq from "lodash/uniq.js"
import albumReleased from "./albumReleased.js"

export const songsFromMetadata = metadata =>
  metadata.map(({ album, ...song }) => song)

const uniqAlbumVal = songs => key =>
  uniq(songs.map(({ album }) => album[key]))[0]

export const albumFromMetadata = metadata => new Promise(
  (resolve, reject) => {
    const album = {
      title: uniqAlbumVal(metadata)("title"),
      cover: uniqAlbumVal(metadata)("cover"),
      artists: uniqAlbumVal(metadata)("artists"),
      released: uniqAlbumVal(metadata)("released"),
    }
    albumReleased(album)
      .then(released => resolve({
        ...album,
        released,
      }))
      .catch(reject)
  },
)
