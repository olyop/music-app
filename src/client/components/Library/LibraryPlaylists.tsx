import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"

import {
	User,
	UserVar,
	UserPlaylistsOrderBy,
	UserPlaylistsOrderByField,
} from "../../types"

import Feed from "../Feed"
import Helmet from "../Helmet"
import Playlists from "../Playlists"
import LibraryEmpty from "./LibraryEmpty"
import GET_USER_PLAYLISTS from "./getUserPlaylists.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"

const LibraryPlaylists: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<UserPlaylistsOrderByField>("userPlaylists")
	return (
		<Helmet title="Library Playlists">
			<Feed<Data, Vars>
				query={GET_USER_PLAYLISTS}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ user }) => user.playlists.length}
				updateQuery={
					(existing, incoming) => ({
						...existing,
						user: {
							...existing.user,
							playlists: [
								...existing.user.playlists,
								...incoming.user.playlists,
							],
						},
					})
				}
				children={data => (data && isEmpty(data.user.playlists) ? (
					<LibraryEmpty/>
				) : (
					<Playlists
						className="Content"
						orderByKey="userPlaylists"
						playlists={data?.user.playlists}
						orderByFields={Object.keys(UserPlaylistsOrderByField)}
					/>
				))}
			/>
		</Helmet>
	)
}

interface Data {
	user: User,
}

interface Vars extends UserVar {
	orderBy: UserPlaylistsOrderBy,
}

export default LibraryPlaylists