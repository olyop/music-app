import { createElement, FC } from "react"
import { BemInputType } from "@oly_op/bem"

import Item from "../Item"
import DocLinks from "../DocLinks"
import { Song } from "../../types"
import SongTitle from "../SongTitle"
import { deserializeDuration } from "../../helpers"

interface PropTypes {
	song: Song,
	showPlay?: boolean,
	showCover?: boolean,
	showRight?: boolean,
	inLibClassName?: string,
	className?: BemInputType,
	showTrackNumber?: boolean,
}

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
		imgDoc={showCover ? song.album : null}
		left={showTrackNumber ? song.trackNumber : null}
		lower={<DocLinks docs={song.artists} ampersand/>}
		right={showRight ? deserializeDuration(song.duration) : null}
	/>
)

export default Song