import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import DocLink from "../DocLink"
import { Playlist as TPlaylist } from "../../types"

import "./index.scss"

const bem = createBem("Playlist")

const Playlist: FC<PropTypes> = ({ playlist }) => (
	<div className={bem("", "Content")}>
		<h1 className="Heading2">
			<DocLink doc={playlist}/>
		</h1>
	</div>
)

interface PropTypes {
	playlist: TPlaylist,
}

export default Playlist