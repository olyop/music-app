import { createElement, FC } from "react"

import Feed from "../Feed"
import Helmet from "../Helmet"
import Playlists from "../Playlists"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import GET_USER_PLAYLISTS from "./getUserPlaylists.gql"

const LibraryPlaylists: FC = () => (
	<Helmet title="Library Playlists">
		<Feed<Data, UserVar>
			query={GET_USER_PLAYLISTS}
			variables={{ userId: useStateUserId() }}
			dataToDocsLength={({ user }) => user.playlists.length}
			updateQuery={(existing, incoming) => ({
				...existing,
				user: {
					...existing.user,
					playlists: [
						...existing.user.playlists,
						...incoming.user.playlists,
					],
				},
			})}
			children={data => (
				<Playlists
					className="Content"
					playlists={data?.user.playlists}
				/>
			)}
		/>
	</Helmet>
)

interface Data {
	user: User,
}

export default LibraryPlaylists