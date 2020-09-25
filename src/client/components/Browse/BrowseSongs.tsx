import { createElement, FC } from "react"

import Feed from "../Feed"
import Songs from "../Songs"
import Helmet from "../Helmet"
import GET_SONGS from "./getSongs.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"
import { Song, UserVar, SongsOrderBy, SongsOrderByField } from "../../types"

const BrowseSongs: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<SongsOrderBy>("songs")
	return (
		<Helmet title="Browse Songs">
			<Feed<Data, Vars>
				query={GET_SONGS}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ songs }) => songs.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					songs: [
						...existing.songs,
						...incoming.songs,
					],
				})}
				children={
					data => (
						<Songs
							orderByKey="songs"
							className="Content"
							songs={data?.songs || []}
							orderByFields={Object.keys(SongsOrderByField)}
						/>
					)
				}
			/>
		</Helmet>
	)
}

interface Data {
	songs: Song[],
}

interface Vars extends UserVar {
	orderBy: SongsOrderBy,
}

export default BrowseSongs