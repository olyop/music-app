import isNull from "lodash/isNull"
import { createElement, FC, Fragment } from "react"
import { BemInput, BemPropTypes } from "@oly_op/bem"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import {
	getMp3Url,
	determineDocId,
	numberWithCommas,
	uuidRemoveDashes,
} from "../../helpers"

import Item from "../Item"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"
import USER_SONG_NEXT from "./userSongNext.gql"
import { useStateShowGenres } from "../../redux"
import { User, Song as TSong } from "../../types"
import USER_SONG_AFTER from "./userSongAfter.gql"
import USER_SONG_LATER from "./userSongLater.gql"
import FeaturingArtists from "../FeaturingArtists"
import { useToggleInLibrary, useMutation, usePlaySong } from "../../hooks"

const Song: FC<PropTypes> = ({
	song,
	index,
	className,
	iconClassName,
	hidePlay = false,
	hideCover = false,
	hidePlays = false,
	hideDuration = false,
	hideInLibrary = false,
	hideTrackNumber = false,
}) => {
	const {
		album,
		songId,
		genres,
		duration,
		playsTotal,
		trackNumber,
	} = song

	const variables: QueueVars = { songId }
	const showGenres = useStateShowGenres()

	const [ togglePlay, play ] =
		usePlaySong(song)

	const [ toggleInLibrary, inLibrary ] =
		useToggleInLibrary(song)

	const [ next, { loading: nextLoading } ] =
		useMutation<QueueData, QueueVars>(USER_SONG_NEXT, { variables })

	const [ after, { loading: afterLoading } ] =
		useMutation<QueueData, QueueVars>(USER_SONG_AFTER, { variables })

	const [ later, { loading: laterLoading } ] =
		useMutation<QueueData, QueueVars>(USER_SONG_LATER, { variables })

	const loading =
		nextLoading || afterLoading || laterLoading

	const handleNextClick =
		async () => { await next() }

	const handleAfterClick =
		async () => { await after() }

	const handleLaterClick =
		async () => { await later() }

	return (
		<Item
			className={className}
			iconClassName={iconClassName}
			imgDoc={hideCover ? undefined : album}
			left={index || (hideTrackNumber ? null : trackNumber)}
			play={hidePlay ? undefined : { play, onClick: togglePlay }}
			modalHeader={{
				imgDoc: album,
				textDoc: song,
			}}
			inLibrary={hideInLibrary ? undefined : {
				inLibrary,
				onClick: toggleInLibrary,
			}}
			info={{
				lowerLeft: (
					<Fragment>
						<FeaturingArtists song={song}/>
						{showGenres && (
							<Fragment>
								<Fragment> &#8226; </Fragment>
								<DocLinks ampersand docs={genres}/>
							</Fragment>
						)}
					</Fragment>
				),
				upperLeft: <SongTitle song={song} onClick={togglePlay}/>,
				rightRight: hideDuration || deserializeDuration(duration),
				rightLeft: (hidePlays || isNull(playsTotal)) ?
					null : numberWithCommas(playsTotal),
			}}
			modalButtons={[{
				handler: togglePlay,
				text: play ? "Pause" : "Play",
				icon: play ? "pause" : "play_arrow",
			},{
				text: "Next",
				icon: "playlist_add",
				handler: loading ? undefined : handleNextClick,
			},{
				text: "After",
				icon: "queue_music",
				handler: loading ? undefined : handleAfterClick,
			},{
				icon: "queue",
				text: "Later",
				handler: loading ? undefined : handleLaterClick,
			},{
				icon: "get_app",
				text: "Download",
				externalLink: true,
				link: getMp3Url(songId),
				externalLinkProps: { type: "audio/mpeg", download: true },
			},{
				handler: toggleInLibrary,
				icon: inLibrary ? "done" : "add",
				text: inLibrary ? "In Library" : "Add",
			},{
				text: "Playlist",
				icon: "playlist_add",
				link: `/addSongToPlaylist/${uuidRemoveDashes(determineDocId(song))}`,
			}]}
		/>
	)
}

interface QueueData {
	user: User,
}

interface QueueVars {
	songId: string,
}

interface PropTypes extends BemPropTypes {
	song: TSong,
	index?: number,
	hidePlay?: boolean,
	hideCover?: boolean,
	hidePlays?: boolean,
	hideDuration?: boolean,
	hideInLibrary?: boolean,
	iconClassName?: BemInput,
	hideTrackNumber?: boolean,
}

export default Song