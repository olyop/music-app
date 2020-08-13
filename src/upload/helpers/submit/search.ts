import { Client } from "./types"
import { Album, Genre, Artist } from "../../types"
import { getSearchResults } from "../getSearchResults"

import ALBUM_SEARCH from "../../graphql/albumSearch.gql"
import GENRE_SEARCH from "../../graphql/genreSearch.gql"
import ARTIST_SEARCH from "../../graphql/artistSearch.gql"

interface AlbumRes {
	albumSearch: Album[],
}

interface GenreRes {
	genreSearch: Genre[],
}

interface ArtistRes {
	artistSearch: Artist[],
}

export const searchAlbum = (client: Client) => async (album: string) => {
	const search = getSearchResults(client)
	const res = await search<Album, AlbumRes, string>({
		exact: true,
		query: ALBUM_SEARCH,
		parseDoc: ({ albumId }) => albumId,
		parseRes: ({ albumSearch }) => albumSearch,
	})(album)
	return res[0]
}

export const searchGenre = (client: Client) => async (genre: string) => {
	const search = getSearchResults(client)
	const res = await search<Genre, GenreRes, string>({
		exact: true,
		query: GENRE_SEARCH,
		parseDoc: ({ genreId }) => genreId,
		parseRes: ({ genreSearch }) => genreSearch,
	})(genre)
	return res[0]
}

export const searchArtist = (client: Client) => async (artist: string) => {
	const search = getSearchResults(client)
	const res = await search<Artist, ArtistRes, string>({
		exact: true,
		query: ARTIST_SEARCH,
		parseDoc: ({ artistId }) => artistId,
		parseRes: ({ artistSearch }) => artistSearch,
	})(artist)
	return res[0]
}