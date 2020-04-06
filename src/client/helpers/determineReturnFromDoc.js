const determineReturnFromDoc = ({ __typename }) => (song, album, genre, artist) => {
  if (__typename === "Song") return song
  else if (__typename === "Album") return album
  else if (__typename === "Genre") return genre
  else return artist
}

export default determineReturnFromDoc
