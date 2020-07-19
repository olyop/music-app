import { createElement, FC } from "react"

import {
	User,
	UserVar,
	UserSongOrderBy,
	UserSongOrderByField,
} from "../../types"

import Songs from "../Songs"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { useUserContext } from "../../contexts/User"
import { useSettingsContext } from "../../contexts/Settings"
import GET_USER_SONGS from "../../graphql/queries/userSongs.gql"

const LibrarySongs: FC = () => {
	const { settings: { userSongsOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Library Songs">
			<QueryApi<Res, Vars>
				query={GET_USER_SONGS}
				variables={{ userId: useUserContext(), orderBy: userSongsOrderBy }}
				children={
					res => (
						<Songs
							orderByKey="userSongsOrderBy"
							songs={res ? res.user.songs : []}
							orderByFields={Object.keys(UserSongOrderByField)}
						/>
					)
				}
			/>
		</Helmet>
	)
}

interface Res {
	user: User,
}

interface Vars extends UserVar {
	orderBy: UserSongOrderBy,
}

export default LibrarySongs