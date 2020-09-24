import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import { useStateListStyle } from "../../redux"
import { uuidRemoveDashes } from "../../helpers"
import { Album as AlbumType, ListStyle } from "../../types"

const bem = createBem("Album")

const Album: FC<PropTypes> = ({
	album,
	className,
	alwaysList = false,
	hideReleased = false,
}) => {
	const listStyle = useStateListStyle()
	return (
		listStyle === ListStyle.LIST || alwaysList ? (
			<Item
				doc={album}
				hideInLibrary
				imgDoc={album}
				upper={<DocLink doc={album}/>}
				lower={<DocLinks docs={album.artists}/>}
				right={hideReleased ? undefined : album.released}
				className={bem(className, "PaddingHalf ItemBorder Hover")}
			/>
		) : (
			<div className={bem(className, "Card Elevated")}>
				<Cover
					url={album.cover}
					title={album.title}
					link={`/album/${uuidRemoveDashes(album.albumId)}`}
				/>
				<Item
					doc={album}
					hideInLibrary
					className="PaddingHalf"
					upper={<DocLink doc={album}/>}
					lower={<DocLinks ampersand docs={album.artists}/>}
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