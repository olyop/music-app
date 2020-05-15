import uniq from "lodash/uniq.js"

const determineAlbum = songs => ({
  title: uniq(songs.map(({ album }) => album.title))[0],
  cover: uniq(songs.map(({ album }) => album.cover))[0],
  artists: uniq(songs.map(({ album }) => album.artists))[0],
  released: uniq(songs.map(({ album }) => album.released))[0],
})

export default determineAlbum
