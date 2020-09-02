import { createElement, FC } from "react"

import Feed from "../Feed"
import Songs from "../Songs"
import Helmet from "../Helmet"
import { useUserContext } from "../../contexts/User"
import GET_SONGS from "../../graphql/queries/songs.gql"
import { useSettingsContext } from "../../contexts/Settings"
import { Song, UserVar, SongOrderBy, SongOrderByField } from "../../types"

const BrowseSongs: FC = () => {
	const userId = useUserContext()
	const { settings } = useSettingsContext()
	return (
		<Helmet title="Browse Songs">
			<Feed<Data, Vars>
				dataKey="songs"
				query={GET_SONGS}
				parseData={({ songs }) => songs}
				variables={{ userId, orderBy: settings.songsOrderBy }}
			>
				{data => (
					<Songs
						songs={data?.songs || []}
						orderByKey="songsOrderBy"
						orderByFields={Object.keys(SongOrderByField)}
					/>
				)}
			</Feed>
		</Helmet>
	)
}

interface Data {
	songs: Song[],
}

interface Vars extends UserVar {
	orderBy: SongOrderBy,
}

export default BrowseSongs