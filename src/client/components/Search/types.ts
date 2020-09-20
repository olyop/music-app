import { Song, Genre, Album, Artist } from "../../types"

export interface Data {
	songSearch: Song[],
	genreSearch: Genre[],
	albumSearch: Album[],
	artistSearch: Artist[],
}