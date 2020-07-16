import { createElement, FC } from "react"

import Songs from "../Songs"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Song } from "../../types"
import GET_SONGS from "../../graphql/queries/songs.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseSongs: FC = () => {
	const { settings } = useSettingsContext()
	return (
		<Helmet title="Browse Songs">
			<QueryApi
				query={GET_SONGS}
				variables={{ orderBy: settings.songsOrderBy }}
				children={(res: Res) => <Songs songs={res.songs}/>}
			/>
		</Helmet>
	)
}

interface Res {
	songs: Song[],
}

export default BrowseSongs