import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import { uuidRemoveDashes } from "../../helpers"
import { Album as AlbumType, ListStyle } from "../../types"
import { useStateListStyle, useStateShowReleased } from "../../redux"

const bem = createBem("Album")

const Album: FC<PropTypes> = ({
	album,
	className,
	alwaysList = false,
	hideReleased = false,
}) => {
	const listStyle = useStateListStyle()
	const showReleased = useStateShowReleased()
	return (
		listStyle === ListStyle.LIST || alwaysList ? (
			<Item
				imgDoc={album}
				upper={<DocLink doc={album}/>}
				lower={<DocLinks docs={album.artists}/>}
				className={bem(className, "PaddingHalf ItemBorder Hover")}
				right={hideReleased || !showReleased ? undefined : album.released}
			/>
		) : (
			<div className={bem(className, "Card Elevated")}>
				<Cover
					url={album.cover}
					title={album.title}
					link={`/album/${uuidRemoveDashes(album.albumId)}`}
				/>
				<Item
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