const songsWithAlbum = ({ songs, ...album }) => songs.map(
  song => ({
    ...song,
    album: {
      ...album,
    },
  }),
)

export default songsWithAlbum
