import { createElement, FC } from "react"

import {
	Song,
	UserVar,
	SongOrderBy,
	SongOrderByField,
} from "../../types"

import Feed from "../Feed"
import Songs from "../Songs"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { usePage } from "../../helpers"
import { useUserContext } from "../../contexts/User"
import GET_SONGS from "../../graphql/queries/songs.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseSongs: FC = () => {
	const page = usePage()
	const userId = useUserContext()
	const { settings: { songsOrderBy: orderBy } } = useSettingsContext()
	const baseVariables: BaseVars = { userId, orderBy }
	return (
		<Helmet title="Browse Songs">
			<QueryApi<Data, Vars>
				query={GET_SONGS}
				variables={{
					...baseVariables,
					page: page.current,
				}}
				children={
					({ data, fetchMore }) => data && (
						<Feed
							onLoadMore={() => {
								page.current += 1
								fetchMore({
									variables: {
										...baseVariables,
										page: page.current,
									},
								})
							}}
							children={(
								<Songs
									songs={data.songs}
									orderByKey="songsOrderBy"
									orderByFields={Object.keys(SongOrderByField)}
								/>
							)}
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

interface BaseVars extends UserVar {
	orderBy: SongOrderBy,
}

interface Vars extends BaseVars {
	page: number,
}

export default BrowseSongs