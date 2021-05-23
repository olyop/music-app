import { createElement, FC, ReactNode } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import DocLink from "../DocLink"
import Item, { InLibraryConfig } from "../Item"
import { determinePlural } from "../../helpers"
import { useToggleInLibrary } from "../../hooks"
import { Handler, Playlist as TPlaylist } from "../../types"

const bem = createBem("Playlist")

const Playlist: FC<PropTypes> = ({
	onClick,
	playlist,
	className,
	hideModal = false,
	hideInLibrary = false,
}) => {
	const [ toggleInLibrary, inLibrary ] =
		useToggleInLibrary(playlist)

	const handleToggleInLibrary =
		async () => {
			await toggleInLibrary()
		}

	const inLibraryConfig: InLibraryConfig =
		{ inLibrary, onClick: handleToggleInLibrary }

	const lower: ReactNode =
		playlist.songsTotal === null ||
			`${playlist.songsTotal!} song${determinePlural(playlist.songsTotal!)}.`

	return (
		<Item
			onClick={onClick}
			className={bem(className)}
			inLibrary={hideInLibrary ? undefined : inLibraryConfig}
			modalButtons={hideModal ? undefined : [{
				handler: toggleInLibrary,
				icon: inLibrary ? "done" : "add",
				text: inLibrary ? "In Library" : "Add",
			}]}
			info={{
				lowerLeft: lower,
				upperLeft: onClick ? playlist.title : <DocLink doc={playlist}/>,
			}}
		/>
	)
}

interface PropTypes extends BemPropTypes {
	onClick?: Handler,
	playlist: TPlaylist,
	hideModal?: boolean,
	hideInLibrary?: boolean,
}

export default Playlist