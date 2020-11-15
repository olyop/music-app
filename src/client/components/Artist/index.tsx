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

	const [ toggleInLibrary, { inLibrary, loading: inLibraryLoading } ] =
		useInLibrary(artist)

	const upper = <DocLink doc={artist}/>

	const lower = artistLower(artist)

	const modal: Modal = {
		title: artist.name,
		buttons: [{
			icon: inLibrary ? "done" : "add",
			text: inLibrary ? "Remove" : "Add",
			handler: inLibraryLoading ? undefined : toggleInLibrary,
		}],
	}

	return listStyle === ListStyle.LIST || alwaysList ? (
		<Item
			doc={artist}
			upper={upper}
			lower={lower}
			modal={modal}
			imgDoc={artist}
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
				doc={artist}
				upper={upper}
				lower={lower}
				modal={modal}
				className="PaddingHalf"
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