import client from "../../../apollo"
import { ParseSongs } from "../../../types"
import PARSE_SONGS from "../../../graphql/queries/parseSongs.gql"

const getMetadata = (files: FileList): Promise<ParseSongs> => new Promise(
	(resolve, reject) => {
		if (files instanceof FileList) {
			client
				.query<TData, TVar>({ query: PARSE_SONGS, variables: { files } })
				.then(({ data }) => resolve({
					album: data.parseSongs.album,
					songs: data.parseSongs.songs.map(
						(metadata, index) => ({
							...metadata,
							audio: files[index],
						}),
					),
				}))
				.catch(reject)
		} else {
			reject(new Error("Invalid input type."))
		}
	},
)

type TData = {
	parseSongs: ParseSongs,
}

type TVar = {
	files: FileList,
}

export default getMetadata