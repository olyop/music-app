import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"

import Feed from "../Feed"
import Albums from "../Albums"
import Helmet from "../Helmet"
import LibraryEmpty from "./LibraryEmpty"
import { useStateOrderBy } from "../../redux"
import GET_USER_ALBUMS from "./getUserAlbums.gql"
import { User, AlbumsOrderBy, AlbumsOrderByField } from "../../types"

const LibraryAlbums: FC = () => {
	const orderBy = useStateOrderBy<AlbumsOrderByField>("albums")
	return (
		<Helmet title="Library Artists">
			<Feed<Res, Vars>
				query={GET_USER_ALBUMS}
				variables={{ orderBy }}
				dataToDocsLength={({ user }) => user.albums.length}
				children={data => (data && isEmpty(data.user.albums) ? (
					<LibraryEmpty name="albums"/>
				) : (
					<Albums
						albums={data?.user.albums}
						hideOrderBy={isEmpty(data?.user.albums)}
						orderByFields={Object.keys(AlbumsOrderByField)}
					/>
				))}
			/>
		</Helmet>
	)
}

interface Res {
	user: User,
}

interface Vars {
	orderBy: AlbumsOrderBy,
}

export default LibraryAlbums