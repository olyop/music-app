import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import { useAlbumShuffle, usePlayAlbum } from "../../hooks"
import { Album as AlbumType, ListStyle } from "../../types"
import { getCatalogImg, uuidRemoveDashes } from "../../helpers"
import { useStateListStyle, useStateShowReleased } from "../../redux"
import { ModalHeaderPropTypes, ModalButtonPropTypes } from "../Modal"

const bem = createBem("Album")

const Album: FC<PropTypes> = ({
	album,
	className,
	alwaysList = false,
	hideReleased = false,
}) => {
	const listStyle = useStateListStyle()
	const showReleased = useStateShowReleased()

	const [ handleAlbumShuffle, { loading: shuffleLoading } ] =
		useAlbumShuffle(album.albumId)

	const [ handlePlayAlbum, isPlaying, { loading: playLoading } ] =
		usePlayAlbum(album.albumId)

	const loading = shuffleLoading || playLoading

	const modalHeader: ModalHeaderPropTypes =
		{ textDoc: album }

	const modalButtons: ModalButtonPropTypes[] = [{
		text: isPlaying ? "Pause" : "Play",
		icon: isPlaying ? "pause" : "play_arrow",
		handler: loading ? undefined : handlePlayAlbum,
	},{
		icon: "shuffle",
		text: "Shuffle",
		handler: loading ? undefined : handleAlbumShuffle,
	}]

	return (
		listStyle === ListStyle.LIST || alwaysList ? (
			<Item
				imgDoc={album}
				modalHeader={modalHeader}
				modalButtons={modalButtons}
				className={bem(className, "PaddingHalf ItemBorder Hover")}
				play={{
					play: isPlaying,
					onClick: loading ? undefined : handlePlayAlbum,
				}}
				info={{
					upperLeft: <DocLink doc={album}/>,
					lowerLeft: <DocLinks docs={album.artists}/>,
					rightRight: hideReleased || !showReleased ? undefined : album.released,
				}}
			/>
		) : (
			<div className={bem(className, "Card Elevated")}>
				<Cover
					title={album.title}
					url={getCatalogImg(album.albumId)}
					link={`/album/${uuidRemoveDashes(album.albumId)}`}
				/>
				<Item
					className="PaddingHalf"
					modalHeader={modalHeader}
					modalButtons={modalButtons}
					info={{
						upperLeft: <DocLink doc={album}/>,
						lowerLeft: <DocLinks docs={album.artists}/>,
					}}
					play={{
						play: isPlaying,
						onClick: loading ? undefined : handlePlayAlbum,
					}}
				/>
			</div>
		)
	)
}

interface PropTypes {
	album: AlbumType,
	className?: string,
	alwaysList?: boolean,
	hideReleased?: boolean,
}

export default Album