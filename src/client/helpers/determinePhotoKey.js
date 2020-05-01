const determinePhotoKey = ({ __typename }) =>
  (__typename === "Album" ? "cover" : "photo")

export default determinePhotoKey
