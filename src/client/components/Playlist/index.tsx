import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import DocLink from "../DocLink"
import { Playlist } from "../../types"

import "./index.scss"

const bem = createBem("Playlist")

const Playlist: FC<PropTypes> = ({ playlist }) => (
	<div className={bem("")}>
		<div className={bem("info")}>
			<DocLink doc={playlist}/>
		</div>
	</div>
)

interface PropTypes {
	playlist: Playlist,
}

export default Playlist