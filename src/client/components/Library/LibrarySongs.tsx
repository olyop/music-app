import { createElement, FC } from "react"

import Songs from "../Songs"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import { useUserContext } from "../../contexts/User"
import { useSettingsContext } from "../../contexts/Settings"
import GET_USER_SONGS from "../../graphql/queries/userSongs.gql"

const LibrarySongs: FC = () => {
	const { settings: { songsOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Library Songs">
			<QueryApi
				query={GET_USER_SONGS}
				variables={{ userId: useUserContext(), orderBy: songsOrderBy }}
				children={(res: Res | undefined) => (
					res && <Songs songs={res.user.songs}/>
				)}
			/>
		</Helmet>
	)
}

interface Res {
	user: User,
}

export default LibrarySongs