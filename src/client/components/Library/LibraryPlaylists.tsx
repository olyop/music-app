import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"

import { User,
	UserPlaylistsOrderBy,
	UserPlaylistsOrderByField,
} from "../../types"

import Feed from "../Feed"
import Helmet from "../Helmet"
import Playlists from "../Playlists"
import LibraryEmpty from "./LibraryEmpty"
import { useStateOrderBy } from "../../redux"
import GET_USER_PLAYLISTS from "./getUserPlaylists.gql"

const LibraryPlaylists: FC = () => {
	const orderBy = useStateOrderBy<UserPlaylistsOrderByField>("userPlaylists")
	return (
		<Helmet title="Library Playlists">
			<Feed<Data, Vars>
				variables={{ orderBy }}
				query={GET_USER_PLAYLISTS}
				dataToDocsLength={({ user }) => user.playlists.length}
				children={data => (data && isEmpty(data.user.playlists) ? (
					<LibraryEmpty name="playlists"/>
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

interface Vars {
	orderBy: UserPlaylistsOrderBy,
}

export default LibraryPlaylists