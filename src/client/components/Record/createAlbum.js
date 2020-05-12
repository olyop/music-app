import toDataUrl from "./toDataUrl"
import { pipe } from "../../helpers"
import { splitList } from "./common"
import { uniqueId, uniq } from "lodash"
import arrayBufferToBase64 from "./arrayBufferToBase64"

const determineAlbumCover = picture =>
  pipe(picture.data.buffer)(arrayBufferToBase64, toDataUrl)

const albumSongsUniq = files => uniqCallback =>
  uniq(files.map(uniqCallback))[0]

const createAlbum = files => {
  const songsUniq = albumSongsUniq(files)
  const cover = songsUniq(({ id3 }) => id3.common.picture[0])
  const title = songsUniq(({ id3 }) => id3.common.album)
  const artists = splitList(songsUniq(({ id3 }) => id3.common.albumartist))
  return {
    title,
    artists,
    released: "",
    albumId: uniqueId(),
    cover: determineAlbumCover(cover),
  }
}

export default createAlbum
