import { createElement, FC } from "react"

import Feed from "../Feed"
import Albums from "../Albums"
import Helmet from "../Helmet"
import GET_ALBUMS from "../../graphql/queries/albums.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"
import { Album, UserVar, AlbumsOrderBy, AlbumsOrderByField } from "../../types"

const BrowseAlbums: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<AlbumsOrderBy>("albums")
	return (
		<Helmet title="Browse Artists">
			<Feed<Data, Vars>
				dataKey="albums"
				query={GET_ALBUMS}
				parseData={({ albums }) => albums}
				variables={{ userId, orderBy }}
			>
				{data => (
					<Albums
						orderByKey="albums"
						albums={data?.albums || []}
						orderByFields={Object.keys(AlbumsOrderByField)}
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
	orderBy: AlbumsOrderBy,
}

export default BrowseAlbums