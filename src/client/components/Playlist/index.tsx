import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Item from "../Item"
import DocLink from "../DocLink"
import { useInLibrary } from "../../helpers"
import { Playlist as TPlaylist } from "../../types"

const bem = createBem("Playlist")

const Playlist: FC<PropTypes> = ({ playlist, className }) => {
	const [ toggleInLibrary, inLibrary ] = useInLibrary(playlist)
	return (
		<Item
			className={bem(className)}
			lower={playlist.songsTotal}
			upper={<DocLink doc={playlist}/>}
			inLibrary={{ inLibrary, toggleInLibrary }}
			modalButtons={[{
				handler: toggleInLibrary,
				icon: inLibrary ? "done" : "add",
				text: inLibrary ? "In Library" : "Add",
			}]}
		/>
	)
}

interface PropTypes extends BemPropTypes {
	playlist: TPlaylist,
}

export default Playlist