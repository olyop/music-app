import { dataUrlToBlob } from "./dataUrlBlobConvert"

const handleMetadata = (setAlbum, setSongs) => ({ songs, album }) => {
  setSongs(songs)
  setAlbum({ ...album, cover: dataUrlToBlob(album.cover) })
}

export default handleMetadata
