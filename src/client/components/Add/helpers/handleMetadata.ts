import uniqueId from "lodash/uniqueId"
import { dataUrlToBlob } from "./dataUrlBlobConvert"

const normalizeList = list =>
  list.map(item => ({ id: uniqueId(), val: item }))

export const handleMetadata = (setAlbum, setSongs) => ({ songs, album }) => {
  setSongs(songs.map(song => ({
    ...song,
    id: uniqueId(),
    genres: normalizeList(song.genres),
    artists: normalizeList(song.artists),
    remixers: normalizeList(song.remixers),
    featuring: normalizeList(song.featuring),
  })))
  setAlbum({
    ...album,
    cover: dataUrlToBlob(album.cover),
    artists: normalizeList(album.artists),
  })
}