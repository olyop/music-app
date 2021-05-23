import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"
import { useParams, Link, useHistory } from "react-router-dom"

import Songs from "../Songs"
import Helmet from "../Helmet"
import Button from "../Button"
import DocLink from "../DocLink"
import DELETE_PLAYLIST from "./deletePlaylist.gql"
import { useQuery, useMutation } from "../../hooks"
import SHUFFLE_PLAYLIST from "./shufflePlaylist.gql"
import GET_PLAYLIST_PAGE from "./getPlaylistPage.gql"
import { Playlist, SongsOrderByField, User } from "../../types"
import { uuidAddDashes, determineDocPath, getUserId } from "../../helpers"

const bem = createBem("PlaylistPage")

const PlaylistPage: FC = () => {
	const userId = getUserId()
	const history = useHistory()
	const params = useParams<Params>()
	const playlistId = uuidAddDashes(params.playlistId)

	const variables: Vars = { playlistId }

	const { data } =
		useQuery<PlaylistPageData, Vars>(GET_PLAYLIST_PAGE, { variables })

	const [ deletePlaylist ] =
		useMutation<DeletePlaylistData, Vars>(DELETE_PLAYLIST, { variables })

	const [ shufflePlaylist ] =
		useMutation<ShufflePlaylistData, Vars>(SHUFFLE_PLAYLIST, { variables })

	const isUsers =
		data?.playlist.user.userId === userId

	const handleDeletePlaylist =
		async () => {
			await deletePlaylist()
			history.goBack()
		}

	const handleShufflePlaylist =
		async () => {
			await shufflePlaylist()
		}

	return (
		<div className={bem("", "Content PaddingTopBottom")}>
			{data && (
				<Helmet title={data.playlist.title}>
					<Link to={determineDocPath(data.playlist)}>
						<h1 className="Heading1 MarginBottomHalf">
							{data.playlist.title}
						</h1>
					</Link>
					<h2 className="Heading2 MarginBottom">
						<Fragment>Author: </Fragment>
						<DocLink doc={data.playlist.user}/>
					</h2>
					<div className="MarginBottom">
						{isEmpty(data.playlist.songs) ? (
							<p className="Text">No songs.</p>
						) : (
							<Songs
								orderByKey="songs"
								songs={data.playlist.songs}
								orderByFields={Object.keys(SongsOrderByField)}
							/>
						)}
					</div>
					{isUsers && (
						<div className="FlexListGap">
							<Button
								icon="shuffle"
								text="Shuffle"
								onClick={handleShufflePlaylist}
							/>
							<Button
								icon="delete"
								text="Delete"
								onClick={handleDeletePlaylist}
							/>
						</div>
					)}
				</Helmet>
			)}
		</div>
	)
}

interface Params {
	playlistId: string,
}

interface PlaylistPageData {
	playlist: Playlist,
}

interface DeletePlaylistData {
	deletePlaylist: User,
}

interface ShufflePlaylistData {
	shufflePlaylist: User,
}

interface Vars extends Params {}

export default PlaylistPage