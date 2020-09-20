import { Data } from "./types"
import { isSong, isAlbum } from "./isDoc"
import { Song, Genre, Album, Artist } from "../../types"

const reduceResults = (data: Data, input: string) =>
	[
		...data.songSearch,
		...data.albumSearch,
		...data.genreSearch,
		...data.artistSearch,
	].map(doc => {
		if (isSong(doc) || isAlbum(doc)) {
			const { title, ...temp } = doc
			return { ...temp, name: title }
		} else {
			return doc
		}
	}).sort(a => {
		if (input < a.name) return 1
		else if (input > a.name) return -1
		else return 0
	}).map(doc => {
		if (isSong(doc) || isAlbum(doc)) {
			const { name, ...temp } = doc
			return { ...temp, title: name } as Song | Album
		} else {
			return doc as Genre | Artist
		}
	})

export default reduceResults