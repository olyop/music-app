import noop from "lodash/noop"
import { createBem } from "@oly_op/bem"
import { useState, createElement, FC } from "react"
import { useHistory, useParams } from "react-router-dom"

import {
	User,
	Song,
	UserVar,
	UserPlaylistsOrderBy,
	UserPlaylistsOrderByField,
} from "../../types"

import Button from "../Button"
import Helmet from "../Helmet"
import ModalButton from "../Modal/ModalButton"
import USER_PLAYLISTS from "./userPlaylists.gql"
import ADD_SONG_TO_PLAYLIST from "./addSongToPlaylist.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"
import { useQuery, useMutation, uuidAddDashes } from "../../helpers"

import "./index.scss"

const bem = createBem("AddSongToPlaylist")

const AddSongToPlaylist: FC = () => {
	const history = useHistory()
	const userId = useStateUserId()
	const params = useParams<Params>()
	const songId = uuidAddDashes(params.songId)

	const [ playlistId, setPlaylistId ] = useState<string | null>(null)

	const orderBy =
		useStateOrderBy<UserPlaylistsOrderByField>("userPlaylists")

	const { data } =
		useQuery<QueryData, QueryVars>(
			USER_PLAYLISTS,
			{ variables: { userId, orderBy } },
		)

	const [ add ] =
		useMutation<MutationData, MutationVars>(ADD_SONG_TO_PLAYLIST)

	const handleAdd = async () => {
		if (playlistId) {
			await add({ variables: { songId, userId, playlistId } })
			history.goBack()
		}
	}

	return (
		<Helmet title="Add Song To Playlist">
			<div className={bem("")}>
				<h1 className="Heading2 MarginBottom">
					Add Song To Playlist
				</h1>
				<div className="Elevated">
					{data?.user.playlists.map(
						playlist => (
							<ModalButton
								onClose={noop}
								key={playlist.playlistId}
								className={playlist.playlistId === playlistId && bem("hover")}
								button={{
									text: playlist.title,
									handler: () => setPlaylistId(playlist.playlistId),
								}}
							/>
						),
					)}
				</div>
				{playlistId && (
					<Button
						icon="add"
						text="Add"
						onClick={handleAdd}
						className="MarginTop"
					/>
				)}
			</div>
		</Helmet>
	)
}

interface Params {
	songId: string,
}

interface QueryData {
	user: User,
}

interface MutationData {
	addSongToPlaylist: Song,
}

interface MutationVars {
	userId: string,
	songId: string,
	playlistId: string,
}

interface QueryVars extends UserVar {
	orderBy: UserPlaylistsOrderBy,
}

export default AddSongToPlaylist