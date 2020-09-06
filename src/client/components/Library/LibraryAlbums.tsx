import { createElement, FC } from "react"

import {
	User,
	UserVar,
	UserAlbumsOrderBy,
	UserAlbumsOrderByField,
} from "../../types"

import Feed from "../Feed"
import Albums from "../Albums"
import Helmet from "../Helmet"
import { useStateUserId, useStateOrderBy } from "../../redux"
import GET_USER_ALBUMS from "../../graphql/queries/userAlbums.gql"

const LibraryAlbums: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<UserAlbumsOrderBy>("userAlbums")
	return (
		<Helmet title="Library Albums">
			<Feed<Data, Vars>
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
						orderByKey="userAlbums"
						albums={data?.user.albums || []}
						orderByFields={Object.keys(UserAlbumsOrderByField)}
					/>
				)}
			/>
		</Helmet>
	)
}

interface Data {
	user: User,
}

interface Vars extends UserVar {
	orderBy: UserAlbumsOrderBy,
}

export default LibraryAlbums