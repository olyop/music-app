import { useMutation } from "@apollo/client"
import { createElement, FC, Fragment } from "react"
import { BemInput, BemPropTypes } from "@oly_op/bem"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import Item from "../Item"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"
import { Song, User, UserVar } from "../../types"
import FeaturingArtists from "../FeaturingArtists"
import { useStateShowGenres, useStateUserId } from "../../redux"
import USER_SONG_NEXT from "../../graphql/mutations/userSongNext.gql"
import USER_SONG_LATER from "../../graphql/mutations/userSongLater.gql"
import USER_SONG_QUEUE from "../../graphql/mutations/userSongQueue.gql"

const Song: FC<PropTypes> = ({
	song,
	className,
	inLibClassName,
	showPlay = true,
	showCover = true,
	showRight = true,
	showTrackNumber = false,
}) => {
	const { songId } = song
	const userId = useStateUserId()
	const variables = { userId, songId }
	const showGenres = useStateShowGenres()
	const [ next ] = useMutation<Data, Vars>(USER_SONG_NEXT, { variables })
	const [ later ] = useMutation<Data, Vars>(USER_SONG_LATER, { variables })
	const [ queue ] = useMutation<Data, Vars>(USER_SONG_QUEUE, { variables })
	return (
		<Item
			doc={song}
			inLibrarySticky
			showPlay={showPlay}
			className={className}
			inLibClassName={inLibClassName}
			upper={<SongTitle song={song}/>}
			imgDoc={showCover ? song.album : undefined}
			left={showTrackNumber ? song.trackNumber : null}
			right={showRight ? deserializeDuration(song.duration) : null}
			modalButtons={[{
				text: "Next",
				handler: () => next(),
			},{
				text: "Later",
				handler: () => later(),
			},{
				text: "Queue",
				handler: () => queue(),
			}]}
			lower={(
				<Fragment>
					<FeaturingArtists
						artists={song.artists}
						featuring={song.featuring}
					/>
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
	song: Song,
	showPlay?: boolean,
	showCover?: boolean,
	showRight?: boolean,
	inLibClassName?: BemInput,
	showTrackNumber?: boolean,
}

export default Song