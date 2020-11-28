import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Item from "../Item"
import DocLink from "../DocLink"
import { Playlist as TPlaylist } from "../../types"

const bem = createBem("Playlist")

const Playlist: FC<PropTypes> = ({ playlist, className }) => (
	<Item
		className={bem(className)}
		lower={playlist.songsTotal}
		upper={<DocLink doc={playlist}/>}
	/>
)

interface PropTypes extends BemPropTypes {
	playlist: TPlaylist,
}

export default Playlist