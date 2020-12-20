import { createElement, FC } from "react"

import {
	UserVar,
	PlaylistOrderBy,
	PlaylistOrderByField,
	Playlist as TPlaylist,
} from "../../types"

import Feed from "../Feed"
import Helmet from "../Helmet"
import Playlists from "../Playlists"
import GET_PLAYLISTS from "./getPlaylists.gql"
import { useStateOrderBy, useStateUserId } from "../../redux"

const BrowsePlaylists: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<PlaylistOrderByField>("playlists")
	return (
		<Helmet title="Browse Playlists">
			<Feed<Data, Vars>
				query={GET_PLAYLISTS}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ playlists }) => playlists.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					songs: [
						...existing.playlists,
						...incoming.playlists,
					],
				})}
				children={data => (
					<Playlists
						className="Content"
						orderByKey="playlists"
						playlists={data?.playlists || []}
						orderByFields={Object.keys(PlaylistOrderByField)}
					/>
				)}
			/>
		</Helmet>
	)
}

interface Data {
	playlists: TPlaylist[],
}

interface Vars extends UserVar {
	orderBy: PlaylistOrderBy,
}

export default BrowsePlaylists