import { BemInput, BemPropTypes } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import Item from "../Item"
import DocLinks from "../DocLinks"
import { Song } from "../../types"
import SongTitle from "../SongTitle"
import { useStateShowGenres } from "../../redux"
import FeaturingArtists from "../FeaturingArtists"

const Song: FC<PropTypes> = ({
	song,
	className,
	inLibClassName,
	showPlay = true,
	showCover = true,
	showRight = true,
	showTrackNumber = false,
}) => (
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
		lower={(
			<Fragment>
				<FeaturingArtists
					artists={song.artists}
					featuring={song.featuring}
				/>
				{useStateShowGenres() && (
					<Fragment>
						<Fragment> &#8226; </Fragment>
						<DocLinks ampersand docs={song.genres}/>
					</Fragment>
				)}
			</Fragment>
		)}
	/>
)

interface PropTypes extends BemPropTypes {
	song: Song,
	showPlay?: boolean,
	showCover?: boolean,
	showRight?: boolean,
	inLibClassName?: BemInput,
	showTrackNumber?: boolean,
}

export default Song