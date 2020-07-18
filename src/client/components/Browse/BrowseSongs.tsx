import { createElement, FC } from "react"

import Songs from "../Songs"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Song } from "../../types"
import { useUserContext } from "../../contexts/User"
import GET_SONGS from "../../graphql/queries/songs.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseSongs: FC = () => {
	const userId = useUserContext()
	const { settings } = useSettingsContext()
	return (
		<Helmet title="Browse Songs">
			<QueryApi
				query={GET_SONGS}
				variables={{ userId, orderBy: settings.songsOrderBy }}
				children={(res: Res | undefined) => (
					res && (
						<Songs
							songs={res.songs}
							orderByIgnore={["DATE_ADDED"]}
						/>
					)
				)}
			/>
		</Helmet>
	)
}

interface Res {
	songs: Song[],
}

export default BrowseSongs