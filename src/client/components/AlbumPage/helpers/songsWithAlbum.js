import { omit } from "lodash"

const songsWithAlbum = album => album.songs.map(
  song => ({
    ...song,
    album: omit(album, ["songs","released"]),
  }),
)

export default songsWithAlbum
