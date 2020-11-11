import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Item from "../Item"
import { Playlist as TPlaylist } from "../../types"

import "./index.scss"
import DocLink from "../DocLink"

const bem = createBem("Playlist")

const Playlist: FC<PropTypes> = ({ playlist, className }) => (
	<Item
		hidePlay
		hideInLibrary
		doc={playlist}
		lower={playlist.songsTotal}
		className={bem(className, "")}
		upper={<DocLink doc={playlist}/>}
	/>
)

interface PropTypes extends BemPropTypes {
	playlist: TPlaylist,
}

export default Playlist