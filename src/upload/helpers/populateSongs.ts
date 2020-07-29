import { ApolloClient } from "@apollo/client"

import { searchQuery } from "./searchQuery"
import { Song, Genre, Artist } from "../types"
import GENRE_SEACRH from "../graphql/genreSearch.gql"
import ARTIST_SEACRH from "../graphql/artistSearch.gql"

const populateSong =
	(apollo: ApolloClient<unknown>) => (song: Song) =>
		new Promise<Song>(
			(resolve, reject) => {
				const query =
					searchQuery(apollo)
				const genresQuery =
					Promise.all(song.genres.map(query<Genre>(GENRE_SEACRH, true)))
				const artistsQuery =
					Promise.all(song.artists.map(query<Artist>(ARTIST_SEACRH, true)))
				// const remixersQuery =
				// 	Promise.all(song.remixers.map(query<Artist>(ARTIST_SEACRH, true)))
				// const featuringQuery =
				// 	Promise.all(song.featuring.map(query<Artist>(ARTIST_SEACRH, true)))
				const queries =
					[genresQuery, artistsQuery]
				Promise.all(queries)
					.then(res => console.log({
						genres: res[0],
						artists: res[1],
						title: song.title,
					}))
					.then(() => resolve(song))
					// .then(([
					// 	genres,
					// 	artists,
					// 	remixers,
					// 	featuring,
					// ]) => ({
					// 	genres,
					// 	artists,
					// 	remixers,
					// 	featuring,
					// }))
					// .then(({
					// 	genres,
					// 	artists,
					// 	remixers,
					// 	featuring,
					// }) => ({
					// 	...song,
					// 	genres,
					// 	artists,
					// 	remixers,
					// 	featuring,
					// }))
					// .then(resolve)
					.catch(reject)
			},
		)

export const populateSongs =
	(apollo: ApolloClient<unknown>) => (songs: Song[]) =>
		new Promise<Song[]>(
			(resolve, reject) => {
				Promise.all(songs.map(populateSong(apollo)))
					.then(resolve)
					.catch(reject)
			},
		)