export const deserializeArtists = artists => {
  const numberOfArtists = artists.length
  return artists.reduce(
    (string, artist, index) => {
      if (index === numberOfArtists - 1) {
        return string
      } else if (index === (numberOfArtists - 2)) {
        return string.concat("& ", artist.name)
      } else {
        return string.concat(", ", artist.name)
      }
    },
    ""
  )
}
