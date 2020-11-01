export const getSongsOrderByField = (field: string) => {
	console.log(field)
	if (field === "album" || field === "released") {
		if (field === "album") {
			return "albums.title"
		} else {
			return "albums.released"
		}
	} else {
		return `songs.${field}`
	}
}