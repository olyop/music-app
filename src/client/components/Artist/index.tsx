import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import {
	artistLower,
	useInLibrary,
	useArtistShuffle,
	uuidRemoveDashes,
} from "../../helpers"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import { useStateListStyle } from "../../redux"
import { Artist as ArtistType, ListStyle, ModalButton } from "../../types"

const bem = createBem("Artist")

const Artist: FC<PropTypes> = ({ artist, className, alwaysList = false }) => {
	const listStyle = useStateListStyle()

	const [ shuffle ] = useArtistShuffle(artist.artistId)
	const [ toggleInLibrary, inLibrary ] = useInLibrary(artist)

	const lower = artistLower(artist)
	const upper = <DocLink doc={artist}/>
	const inLibraryConfig = { inLibrary, toggleInLibrary }

	const modalButtons: ModalButton[] = [{
		handler: toggleInLibrary,
		icon: inLibrary ? "done" : "add",
		text: inLibrary ? "Remove" : "Add",
	},{
		icon: "shuffle",
		text: "Shuffle",
		handler: shuffle,
	}]

	return listStyle === ListStyle.LIST || alwaysList ? (
		<Item
			upper={upper}
			lower={lower}
			imgDoc={artist}
			modalButtons={modalButtons}
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
				className="PaddingHalf"
				modalButtons={modalButtons}
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