import orderBy from "lodash/orderBy"
import { createElement, FC } from "react"

import List from "../List"
import Helmet from "../Helmet"
import Playlist from "../Playlist"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import { useUserContext } from "../../contexts/User"
import GET_USER_PLAYLISTS from "../../graphql/queries/userPlaylists.gql"

const LibraryPlaylists: FC = () => (
	<Helmet title="Library Playlists">
		<QueryApi
			query={GET_USER_PLAYLISTS}
			variables={{ userId: useUserContext() }}
			children={
				({ user: { playlists } }: Data) => (
					<List>
						{orderBy(playlists, "dateAdded", "desc").map(
							playlist => (
								<Playlist
									playlist={playlist}
									key={playlist.playlistId}
								/>
							),
						)}
					</List>
				)
			}
		/>
	</Helmet>
)

interface Data {
	user: User,
}

export default LibraryPlaylists