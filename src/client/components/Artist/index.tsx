import noop from "lodash/noop"
import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import { useStateListStyle } from "../../redux"
import { Artist as ArtistType, ListStyle, Modal } from "../../types"
import { artistLower, uuidRemoveDashes, useInLibrary } from "../../helpers"

const bem = createBem("Artist")

const Artist: FC<PropTypes> = ({ artist, className, alwaysList = false }) => {
	const listStyle = useStateListStyle()

	const [ toggleInLibrary, inLibrary ] =
		useInLibrary(artist)

	const lower = artistLower(artist)
	const upper = <DocLink doc={artist}/>
	const playConfig = { play: false, onClick: noop }
	const inLibraryConfig = { inLibrary, onClick: toggleInLibrary }

	const modal: Modal = {
		buttons: [{
			handler: toggleInLibrary,
			icon: inLibrary ? "done" : "add",
			text: inLibrary ? "Remove" : "Add",
		}],
	}

	return listStyle === ListStyle.LIST || alwaysList ? (
		<Item
			upper={upper}
			lower={lower}
			modal={modal}
			imgDoc={artist}
			play={playConfig}
			inLibrary={inLibraryConfig}
			className={bem(className, "PaddingHalf ItemBorder Hover")}
		/>
	) : (
		<div className={bem(className, "Card Elevated")}>
			<Cover
				landscape
				url={artist.photo}
				link={`/artist/${uuidRemoveDashes(artist.artistId)}`}
			/>
			<Item
				upper={upper}
				lower={lower}
				modal={modal}
				play={playConfig}
				className="PaddingHalf"
				inLibrary={inLibraryConfig}
			/>
		</div>
	)
}

interface PropTypes {
	artist: ArtistType,
	className?: string,
	alwaysList?: boolean,
}

export default Artist