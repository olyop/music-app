import { BemInput } from "@oly_op/bem"
import { createElement, FC } from "react"

import Item from "../Item"
import DocLinks from "../DocLinks"
import { Song } from "../../types"
import SongTitle from "../SongTitle"
import { deserializeDuration } from "../../helpers"

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
		showPlay={showPlay}
		className={className}
		inLibClassName={inLibClassName}
		upper={<SongTitle song={song}/>}
		imgDoc={showCover ? song.album : undefined}
		left={showTrackNumber ? song.trackNumber : null}
		lower={<DocLinks docs={song.artists} ampersand/>}
		right={showRight ? deserializeDuration(song.duration) : null}
	/>
)

interface PropTypes {
	song: Song,
	showPlay?: boolean,
	showCover?: boolean,
	showRight?: boolean,
	className?: BemInput,
	inLibClassName?: BemInput,
	showTrackNumber?: boolean,
}

export default Song