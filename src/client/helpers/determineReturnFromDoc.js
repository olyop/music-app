const determineReturnFromDoc = ({ __typename }) => (song, album, genre, artist) => {
  if (__typename === "Artist") return artist
  else if (__typename === "Album") return album
  else if (__typename === "Genre") return genre
  else return song
}

export default determineReturnFromDoc
