import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import {
	artistLower,
	getCatalogImg,
	determineDocName,
	uuidRemoveDashes,
} from "../../helpers"

import Cover from "../Cover"
import DocLink from "../DocLink"
import { useStateListStyle } from "../../redux"
import Item, { InfoConfig, InLibraryConfig } from "../Item"
import { Artist as ArtistType, ListStyle } from "../../types"
import { useToggleInLibrary, useArtistShuffle } from "../../hooks"
import { ModalHeaderPropTypes, ModalButtonPropTypes } from "../Modal"

const bem = createBem("Artist")

const Artist: FC<PropTypes> = ({ artist, className, alwaysList = false }) => {
	const listStyle =
		useStateListStyle()

	const [ shuffle ] =
		useArtistShuffle(artist.artistId)

	const [ toggleInLibrary, inLibrary ] =
		useToggleInLibrary(artist)

	const handleShuffleClick =
		async () => { await shuffle() }

	const handleToggleInLibrary =
		async () => { await toggleInLibrary() }

	const inLibraryConfig: InLibraryConfig =
		{ inLibrary, onClick: handleToggleInLibrary }

	const modalHeader: ModalHeaderPropTypes =
		{ textDoc: artist }

	const modalButtons: ModalButtonPropTypes[] = [{
		handler: handleToggleInLibrary,
		icon: inLibrary ? "done" : "add",
		text: inLibrary ? "Remove" : "Add",
	},{
		icon: "shuffle",
		text: "Shuffle",
		handler: handleShuffleClick,
	}]

	const info: InfoConfig = {
		lowerLeft: artistLower(artist),
		upperLeft: <DocLink doc={artist}/>,
	}

	return listStyle === ListStyle.LIST || alwaysList ? (
		<Item
			info={info}
			imgDoc={artist}
			modalHeader={modalHeader}
			inLibrary={inLibraryConfig}
			modalButtons={modalButtons}
			className={bem(className, "PaddingHalf ItemBorder Hover")}
		/>
	) : (
		<div className={bem(className, "Card Elevated")}>
			<Cover
				landscape
				title={determineDocName(artist)}
				url={getCatalogImg(artist.artistId)}
				link={`/artist/${uuidRemoveDashes(artist.artistId)}`}
			/>
			<Item
				info={info}
				className="PaddingHalf"
				modalHeader={modalHeader}
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