import type { ApolloClient } from "@apollo/client"
import { Artist, Genre, Album } from "../types"

// import ADD_SONG from "../graphql/addSong.gql"
// import ADD_ALBUM FROM "../graphql/addAlbum.gql"
// import ADD_GENRE from "../graphql/addGenre.gql"
// import ADD_ARTIST from "../graphql/addArtist.gql"

export const submit =
	(client: ApolloClient<unknown>) =>
		async (artists: Artist[], genres: Genre[], albums: Album[]) => {
			try {
				
			} catch (error) {
				
			}
		}