export const songOrderByField = (field: string) => {
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