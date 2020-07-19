import { createElement, FC } from "react"

import {
	Song,
	UserVar,
	SongOrderBy,
	SongOrderByField,
} from "../../types"

import Songs from "../Songs"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { useUserContext } from "../../contexts/User"
import GET_SONGS from "../../graphql/queries/songs.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseSongs: FC = () => {
	const userId = useUserContext()
	const { settings: { songsOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Browse Songs">
			<QueryApi<Res, Vars>
				query={GET_SONGS}
				variables={{ userId, orderBy: songsOrderBy }}
				children={
					res => (
						<Songs
							orderByKey="songsOrderBy"
							songs={res ? res.songs : []}
							orderByFields={Object.keys(SongOrderByField)}
						/>
					)
				}
			/>
		</Helmet>
	)
}

interface Res {
	songs: Song[],
}

interface Vars extends UserVar {
	orderBy: SongOrderBy,
}

export default BrowseSongs