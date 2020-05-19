import uniq from "lodash/uniq.js"

const uniqAlbumVal = (songs, key) =>
  uniq(songs.map(({ album }) => album[key]))[0]

const splitMetadata = songs => ({
  songs: songs.map(({ album, ...song }) => song),
  album: {
    title: uniqAlbumVal(songs, "title"),
    cover: uniqAlbumVal(songs, "cover"),
    artists: uniqAlbumVal(songs, "artists"),
    released: uniqAlbumVal(songs, "released").toString(),
  },
})

export default splitMetadata
