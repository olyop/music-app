const determineFieldOrderText = field => {
  if (field === "artists") return "artists[0].name"
  else if (field === "remixers") return "remixers[0].name"
  else if (field === "album") return "album.title"
  else if (field === "genres") return "genres[0].name"
  else if (field === "released") return "album.released"
  else return field
}

export default determineFieldOrderText
