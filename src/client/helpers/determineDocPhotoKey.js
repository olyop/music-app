const determineDocPhotoKey = ({ __typename }) =>
  (__typename === "Album" ? "cover" : "photo")

export default determineDocPhotoKey
