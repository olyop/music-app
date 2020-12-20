import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { useParams, Link } from "react-router-dom"

import Songs from "../Songs"
import Helmet from "../Helmet"
import { useStateUserId } from "../../redux"
import GET_PLAYLIST_PAGE from "./getPlaylistPage.gql"
import { Playlist, SongsOrderByField, UserVar } from "../../types"
import { useQuery, uuidAddDashes, determineDocPath } from "../../helpers"

import "./index.scss"

const bem = createBem("PlaylistPage")

const PlaylistPage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const playlistId = uuidAddDashes(params.playlistId)
	const variables: Vars = { playlistId, userId }
	const { data } = useQuery<Data, Vars>(GET_PLAYLIST_PAGE, { variables })
	return (
		<div className={bem("", "Content PaddingTopBottom")}>
			{data && (
				<Helmet title={data.playlist.title}>
					<Link to={determineDocPath(data.playlist)}>
						<h1 className="Heading1">
							{data.playlist.title}
						</h1>
					</Link>
					<Songs
						orderByKey="songs"
						className="MarginTop"
						songs={data.playlist.songs}
						orderByFields={Object.keys(SongsOrderByField)}
					/>
				</Helmet>
			)}
		</div>
	)
}

interface Data {
	playlist: Playlist,
}

interface Params {
	playlistId: string,
}

interface Vars extends UserVar {
	playlistId: string,
}

export default PlaylistPage