import { createElement, FC } from "react"

import Feed from "../Feed"
import Albums from "../Albums"
import Helmet from "../Helmet"
import { useUserContext } from "../../contexts/User"
import GET_ALBUMS from "../../graphql/queries/albums.gql"
import { useSettingsContext } from "../../contexts/Settings"
import { Album, UserVar, AlbumOrderBy, AlbumOrderByField } from "../../types"

const BrowseAlbums: FC = () => {
	const userId = useUserContext()
	const { settings } = useSettingsContext()
	return (
		<Helmet title="Browse Artists">
			<Feed<Data, Vars>
				dataKey="albums"
				query={GET_ALBUMS}
				parseData={({ albums }) => albums}
				variables={{ userId, orderBy: settings.albumsOrderBy }}
			>
				{data => (
					<Albums
						orderByKey="albumsOrderBy"
						albums={data?.albums || []}
						orderByFields={Object.keys(AlbumOrderByField)}
					/>
				)}
			</Feed>
		</Helmet>
	)
}

interface Data {
	albums: Album[],
}

interface Vars extends UserVar {
	orderBy: AlbumOrderBy,
}

export default BrowseAlbums