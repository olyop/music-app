import { uniqueId } from "lodash"
import { dataUrlToBlob } from "./dataUrlBlobConvert"

const normalizeList = list =>
  list.map(item => ({ id: uniqueId(), val: item }))

const handleMetadata = (setAlbum, setSongs) => ({ songs, album }) => {
  setSongs(songs)
  setAlbum({
    ...album,
    cover: dataUrlToBlob(album.cover),
    artists: normalizeList(album.artists),
  })
}

export default handleMetadata
