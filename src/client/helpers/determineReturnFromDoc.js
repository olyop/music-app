const determineReturnFromDoc = ({ __typename }) => (song, album, artist) => {
  if (__typename === "Song") return song
  else if (__typename === "Album") return album
  else return artist
}

export default determineReturnFromDoc
