const determinePhotoKey = ({ __typename }) => {
  if (__typename === "Album") return "cover"
  else return "photo"
}

export default determinePhotoKey
