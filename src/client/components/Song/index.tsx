import { createElement, FC, Fragment } from "react"
import { BemInput, BemPropTypes } from "@oly_op/bem"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import {
	usePlay,
	getSongMp3,
	useMutation,
	useInLibrary,
	determineDocId,
	uuidRemoveDashes,
} from "../../helpers"

import Item from "../Item"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"
import USER_SONG_NEXT from "./userSongNext.gql"
import USER_SONG_AFTER from "./userSongAfter.gql"
import USER_SONG_LATER from "./userSongLater.gql"
import FeaturingArtists from "../FeaturingArtists"
import { User, UserVar, Song as TSong } from "../../types"
import { useStateShowGenres, useStateUserId } from "../../redux"

const Song: FC<PropTypes> = ({
	song,
	index,
	className,
	iconClassName,
	hidePlay = false,
	showRight = true,
	hideCover = false,
	hideInLibrary = false,
	showTrackNumber = false,
}) => {
	const { songId } = song
	const userId = useStateUserId()
	const variables = { userId, songId }
	const showGenres = useStateShowGenres()

	const [ handlePlayClick, play ] =
		usePlay(song)

	const [ toggleInLibrary, inLibrary ] =
		useInLibrary(song)

	const [ next, { loading: nextLoading } ] =
		useMutation<QueueData, QueueVars>(USER_SONG_NEXT, { variables })

	const [ after, { loading: afterLoading } ] =
		useMutation<QueueData, QueueVars>(USER_SONG_AFTER, { variables })

	const [ later, { loading: laterLoading } ] =
		useMutation<QueueData, QueueVars>(USER_SONG_LATER, { variables })

	return (
		<Item
			className={className}
			iconClassName={iconClassName}
			imgDoc={hideCover ? undefined : song.album}
			left={index || (showTrackNumber ? song.trackNumber : null)}
			right={showRight ? deserializeDuration(song.duration) : null}
			upper={(
				<SongTitle
					song={song}
					onClick={handlePlayClick}
				/>
			)}
			play={hidePlay ? undefined : {
				play,
				onClick: handlePlayClick,
			}}
			inLibrary={hideInLibrary ? undefined : {
				inLibrary,
				toggleInLibrary,
			}}
			modalButtons={[{
				handler: handlePlayClick,
				text: play ? "Pause" : "Play",
				icon: play ? "pause" : "play_arrow",
			},{
				text: "Next",
				icon: "playlist_add",
				handler: nextLoading ? undefined : next,
			},{
				text: "After",
				icon: "queue_music",
				handler: afterLoading ? undefined : after,
			},{
				icon: "queue",
				text: "Later",
				handler: laterLoading ? undefined : later,
			},{
				icon: "get_app",
				text: "Download",
				externalLink: true,
				link: getSongMp3(song.songId),
			},{
				handler: toggleInLibrary,
				icon: inLibrary ? "done" : "add",
				text: inLibrary ? "In Library" : "Add",
			},{
				text: "Playlist",
				icon: "playlist_add",
				link: `/addSongToPlaylist/${uuidRemoveDashes(determineDocId(song))}`,
			},{
				text: "info",
				icon: "info",
				link: `/song/${uuidRemoveDashes(determineDocId(song))}`,
			}]}
			lower={(
				<Fragment>
					<FeaturingArtists song={song}/>
					{showGenres && (
						<Fragment>
							<Fragment> &#8226; </Fragment>
							<DocLinks ampersand docs={song.genres}/>
						</Fragment>
					)}
				</Fragment>
			)}
		/>
	)
}

interface QueueData {
	user: User,
}

interface QueueVars extends UserVar {
	songId: string,
}

interface PropTypes extends BemPropTypes {
	song: TSong,
	index?: number,
	hidePlay?: boolean,
	hideCover?: boolean,
	showRight?: boolean,
	hideInLibrary?: boolean,
	iconClassName?: BemInput,
	showTrackNumber?: boolean,
}

export default Song