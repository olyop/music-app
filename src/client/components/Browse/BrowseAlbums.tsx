import { createElement, FC } from "react"

import {
	Album,
	UserVar,
	AlbumOrderBy,
	AlbumOrderByField,
} from "../../types"

// import Feed from "../Feed"
import Albums from "../Albums"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { useUserContext } from "../../contexts/User"
import GET_ALBUMS from "../../graphql/queries/albums.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseAlbums: FC = () => {
	const userId = useUserContext()
	const { settings: { albumsOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Browse Albums">
			<QueryApi<Res, Vars>
				query={GET_ALBUMS}
				variables={{ userId, orderBy: albumsOrderBy }}
				children={
					({ data }) => (
						<Albums
							orderByKey="albumsOrderBy"
							albums={data?.albums || []}
							orderByFields={Object.keys(AlbumOrderByField)}
						/>
					)
				}
			/>
		</Helmet>
	)
}

interface Res {
	albums: Album[],
}

interface Vars extends UserVar {
	orderBy: AlbumOrderBy,
}

export default BrowseAlbums