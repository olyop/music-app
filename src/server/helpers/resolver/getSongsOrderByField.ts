export const getSongsOrderByField = (field: string) => {
	if (field === "album" || field === "released") {
		if (field === "album") {
			return "albums.title"
		} else {
			return "albums.released"
		}
	} else if (field === "date_added") {
		return "users_songs.date_added"
	} else {
		return `songs.${field}`
	}
}