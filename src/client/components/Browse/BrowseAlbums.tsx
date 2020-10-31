import { createElement, FC } from "react"

import {
	Album,
	UserVar,
	AlbumsOrderBy,
	AlbumsOrderByField,
} from "../../types"

import Feed from "../Feed"
import Albums from "../Albums"
import Helmet from "../Helmet"
import GET_ALBUMS from "./getAlbums.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"

const BrowseAlbums: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<AlbumsOrderByField>("albums")
	return (
		<Helmet title="Browse Artists">
			<Feed<Data, Vars>
				query={GET_ALBUMS}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ albums }) => albums.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					albums: [
						...existing.albums,
						...incoming.albums,
					],
				})}
				children={data => (
					<Albums
						orderByKey="albums"
						albums={data?.albums || []}
						orderByFields={Object.keys(AlbumsOrderByField)}
					/>
				)}
			/>
		</Helmet>
	)
}

interface Data {
	albums: Album[],
}

interface Vars extends UserVar {
	orderBy: AlbumsOrderBy,
}

export default BrowseAlbums