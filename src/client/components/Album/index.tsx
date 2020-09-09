import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import { useStateListStyle } from "../../redux"
import { Album as AlbumType, ListStyle } from "../../types"

const bem = createBem("Album")

const Album: FC<PropTypes> = ({ album, className }) => {
	const listStyle = useStateListStyle()
	return (
		listStyle === ListStyle.GRID ? (
			<div className={bem(className, "Card", "Elevated")}>
				<Cover
					url={album.cover}
					link={`/album/${album.albumId}`}
				/>
				<Item
					doc={album}
					hideInLibrary
					className="PaddingHalf"
					upper={<DocLink doc={album}/>}
					lower={<DocLinks ampersand docs={album.artists}/>}
				/>
			</div>
		) : (
			<Item
				doc={album}
				hideInLibrary
				imgDoc={album}
				right={album.released}
				upper={<DocLink doc={album}/>}
				lower={<DocLinks docs={album.artists}/>}
				inLibrarySticky={listStyle === ListStyle.LIST}
				className={bem(className, "PaddingHalf", "ItemBorder", "Hover")}
			/>
		)
	)
}

interface PropTypes {
	album: AlbumType,
	className?: string,
}

export default Album