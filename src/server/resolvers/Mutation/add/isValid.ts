import { Upload } from "./types"
import { isSong, isAlbum, isGenre, isArtist } from "./validators"

const isValid = ({ albums, genres, artists }: Upload) => {
	const areAlbumsValid = albums.map(isAlbum).every(Boolean)
	const areGenresValid = genres.map(isGenre).every(Boolean)
	const areArtistsValid = artists.map(isArtist).every(Boolean)
	const areSongsValid = albums.map(({ songs }) => songs).flat().map(isSong).every(Boolean)
	return !areSongsValid || !areGenresValid || !areAlbumsValid || !areArtistsValid
}

export default isValid