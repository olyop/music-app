import { createElement, FC, Fragment } from "react"
import { BemInput, BemPropTypes } from "@oly_op/bem"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import Item from "../Item"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"
import { useMutation } from "../../helpers"
import USER_SONG_NEXT from "./userSongNext.gql"
import USER_SONG_AFTER from "./userSongAfter.gql"
import USER_SONG_LATER from "./userSongLater.gql"
import FeaturingArtists from "../FeaturingArtists"
import { Song as TSong, User, UserVar } from "../../types"
import { useStateShowGenres, useStateUserId } from "../../redux"

const Song: FC<PropTypes> = ({
	song,
	index,
	className,
	iconClassName,
	hidePlay = false,
	showRight = true,
	hideCover = false,
	showTrackNumber = false,
}) => {
	const { songId } = song
	const userId = useStateUserId()
	const variables = { userId, songId }
	const showGenres = useStateShowGenres()
	const [ next ] = useMutation<Data, Vars>(USER_SONG_NEXT, { variables })
	const [ after ] = useMutation<Data, Vars>(USER_SONG_AFTER, { variables })
	const [ later ] = useMutation<Data, Vars>(USER_SONG_LATER, { variables })
	return (
		<Item
			doc={song}
			hidePlay={hidePlay}
			className={className}
			iconClassName={iconClassName}
			upper={<SongTitle song={song}/>}
			imgDoc={hideCover ? undefined : song.album}
			left={index || (showTrackNumber ? song.trackNumber : null)}
			right={showRight ? deserializeDuration(song.duration) : null}
			modalButtons={[
				{ icon: "playlist_add", text: "Next", handler: next },
				{ icon: "queue_music", text: "After", handler: after },
				{ icon: "queue", text: "Later", handler: later },
			]}
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

interface Data {
	user: User,
}

interface Vars extends UserVar {
	songId: string,
}

interface PropTypes extends BemPropTypes {
	song: TSong,
	index?: number,
	hidePlay?: boolean,
	hideCover?: boolean,
	showRight?: boolean,
	iconClassName?: BemInput,
	showTrackNumber?: boolean,
}

export default Song