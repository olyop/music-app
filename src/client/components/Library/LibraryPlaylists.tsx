import orderBy from "lodash/orderBy"
import { createElement, FC } from "react"

import List from "../List"
import Helmet from "../Helmet"
import Playlist from "../Playlist"
import QueryApi from "../QueryApi"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import GET_USER_PLAYLISTS from "./getUserPlaylists.gql"

const LibraryPlaylists: FC = () => (
	<Helmet title="Library Playlists">
		<QueryApi<Data, UserVar>
			query={GET_USER_PLAYLISTS}
			variables={{ userId: useStateUserId() }}
			children={
				({ data }) => (
					<List>
						{orderBy(data?.user.playlists || [], "dateAdded", "desc").map(
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