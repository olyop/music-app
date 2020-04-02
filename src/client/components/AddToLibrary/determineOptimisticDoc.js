const determineOptimisticDoc = doc => {
  const { __typename } = doc
  if (__typename === "Album") {
    return {
      ...doc,
      artists: doc.artists.map(
        artist => ({ ...artist, cover: "" }),
      ),
    }
  } else if (__typename === "Artist") {
    return 
  }
}

export default determineOptimisticDoc
