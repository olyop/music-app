import client from "../../../apollo"
import { ParseSongs } from "../../../types"
import PARSE_SONG from "../../../graphql/queries/parseSong.gql"

const getMetadata = (files: FileList): Promise<ParseSongs> => new Promise(
	(resolve, reject) => {
		if (files instanceof FileList) {
			client
				.query<Data, Var>({ query: PARSE_SONG, variables: { files } })
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

interface Data {
	parseSongs: ParseSongs,
}

interface Var {
	files: FileList,
}

export default getMetadata