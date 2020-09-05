import { createElement, FC } from "react"

import Feed from "../Feed"
import Songs from "../Songs"
import Helmet from "../Helmet"
import GET_SONGS from "../../graphql/queries/songs.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"
import { Song, UserVar, SongsOrderBy, SongsOrderByField } from "../../types"

const BrowseSongs: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<SongsOrderBy>("songs")
	return (
		<Helmet title="Browse Songs">
			<Feed<Data, Vars>
				dataKey="songs"
				query={GET_SONGS}
				variables={{ userId, orderBy }}
				parseData={({ songs }) => songs}
				children={
					data => (
						<Songs
							orderByKey="songs"
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