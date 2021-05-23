import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { useHistory, useParams } from "react-router-dom"
import { useState, createElement, FC, Fragment } from "react"

import {
	User,
	Song,
	UserPlaylistsOrderBy,
	UserPlaylistsOrderByField,
} from "../../types"

import Img from "../Img"
import Icon from "../Icon"
import Button from "../Button"
import DocLink from "../DocLink"
import Playlists from "../Playlists"
import GET_SONG_DATA from "./getSongData.gql"
import { useStateOrderBy } from "../../redux"
import { useQuery, useMutation } from "../../hooks"
import ADD_SONG_TO_PLAYLIST from "./addSongToPlaylist.gql"
import { uuidAddDashes, getCatalogImg } from "../../helpers"
import USER_PLAYLISTS_FILTERED from "./userPlaylistsFiltered.gql"

import "./index.scss"

const bem = createBem("AddSongToPlaylist")

const AddSongToPlaylist: FC = () => {
	const history = useHistory()
	const params = useParams<Params>()
	const songId = uuidAddDashes(params.songId)

	const [ playlistId, setPlaylistId ] =
		useState<string | null>(null)

	const orderBy =
		useStateOrderBy<UserPlaylistsOrderByField>("userPlaylists")

	const { data: userPlaylistsData } =
		useQuery<UserPlaylistsQueryData, UserPlaylistsQueryVars>(
			USER_PLAYLISTS_FILTERED,
			{
				fetchPolicy: "no-cache",
				variables: { orderBy, filterBySong: songId },
			},
		)

	const { data: songData } =
		useQuery<SongTitleData, SongTitleVars>(
			GET_SONG_DATA,
			{ variables: { songId } },
		)

	const [ add ] =
		useMutation<MutationData, MutationVars>(ADD_SONG_TO_PLAYLIST)

	const onClose =
		() => history.goBack()

	const handleAdd =
		async () => {
			if (playlistId) {
				await add({ variables: { songId, playlistId } })
				onClose()
			}
		}

	const handlePlaylistSelect =
		(id: string) => setPlaylistId(id)

	return (
		<div className={bem("", "PaddingTopBottom")}>
			{songData && userPlaylistsData && (
				<Fragment>
					<Img
						url={getCatalogImg(songData.song.album.albumId)}
						className={bem("cover", "MarginBottom Card Elevated")}
					/>
					<h1 className="Heading2 MarginBottom">
						<DocLink doc={songData.song}/>
					</h1>
					{!isEmpty(userPlaylistsData.user.playlists) ? (
						<div className={bem("playlists", "Elevated MarginBottom")}>
							<Playlists
								hideModal
								hideOrderBy
								hideInLibrary
								selectedClassName={bem("selected")}
								isSelected={id => id === playlistId}
								playlists={userPlaylistsData.user.playlists}
								onPlaylistClick={id => handlePlaylistSelect(id)}
							/>
						</div>
					) : (
						<p className="Text MarginBottomHalf">No playlists to add to.</p>
					)}
					<Button
						icon="add"
						text="Add"
						onClick={handleAdd}
						disabled={!playlistId}
					/>
				</Fragment>
			)}
			<Icon
				icon="close"
				onClick={onClose}
				className={bem("cancel", "MarginHalf")}
			/>
		</div>
	)
}

interface Params {
	songId: string,
}

interface MutationData {
	addSongToPlaylist: Song,
}

interface MutationVars {
	songId: string,
	playlistId: string,
}

interface SongTitleData {
	song: Song,
}

interface SongTitleVars {
	songId: string,
}

interface UserPlaylistsQueryData {
	user: User,
}

interface UserPlaylistsQueryVars {
	filterBySong: string,
	orderBy: UserPlaylistsOrderBy,
}

export default AddSongToPlaylist