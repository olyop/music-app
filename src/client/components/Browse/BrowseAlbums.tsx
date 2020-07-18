import { createElement, FC } from "react"

import Albums from "../Albums"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Album as AlbumType } from "../../types"
import { useUserContext } from "../../contexts/User"
import GET_ALBUMS from "../../graphql/queries/albums.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseAlbums: FC = () => {
	const userId = useUserContext()
	const { settings } = useSettingsContext()
	return (
		<Helmet title="Browse Albums">
			<QueryApi
				query={GET_ALBUMS}
				variables={{ userId, orderBy: settings.albumsOrderBy }}
				children={(res: Res | undefined) => (
					res && (
						<Albums
							albums={res.albums}
							orderByIgnore={["DATE_ADDED"]}
						/>
					)
				)}
			/>
		</Helmet>
	)
}

interface Res {
	albums: AlbumType[],
}

export default BrowseAlbums