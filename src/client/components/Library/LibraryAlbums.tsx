import { createElement, FC } from "react"

import {
	User,
	UserVar,
	AlbumsOrderBy,
	AlbumsOrderByField,
} from "../../types"

import Feed from "../Feed"
import Albums from "../Albums"
import Helmet from "../Helmet"
import GET_USER_ALBUMS from "./getUserAlbums.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"

const LibraryArtists: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<AlbumsOrderByField>("albums")
	return (
		<Helmet title="Library Artists">
			<Feed<Res, Vars>
				query={GET_USER_ALBUMS}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ user }) => user.albums.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					user: {
						...existing.user,
						albums: [
							...existing.user.albums,
							...incoming.user.albums,
						],
					},
				})}
				children={data => (
					<Albums
						orderByKey="albums"
						albums={data?.user.albums || []}
						orderByFields={Object.keys(AlbumsOrderByField)}
					/>
				)}
			/>
		</Helmet>
	)
}

interface Res {
	user: User,
}

interface Vars extends UserVar {
	orderBy: AlbumsOrderBy,
}

export default LibraryArtists