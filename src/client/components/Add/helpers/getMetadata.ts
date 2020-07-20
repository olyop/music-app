import { Song } from "../types"
import client from "../../../apollo"
import PARSE_SONG from "../../../graphql/queries/parseSong.gql"

export const getMetadata = (file: File): Promise<Song> =>
	new Promise(
		(resolve, reject) => {
			client
				.query<Res, Vars>({ query: PARSE_SONG, variables: { file } })
				.then(({ data }) => (data ? resolve(data.parseSong) : {}))
				.catch(reject)
		},
	)

interface Res {
	parseSong: Song,
}

interface Vars {
	file: File,
}