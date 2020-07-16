import { createElement, FC } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import { useSettingsContext } from "../../contexts/Settings"
import { Album as AlbumType, ListStyle } from "../../types"

const Album: FC<PropTypes> = ({ album, className = null }) => {
	const { settings: { listStyle } } = useSettingsContext()
	return listStyle === ListStyle.GRID ? (
		<div className={[ "Card", "Elevated", className ].join(" ")}>
			<Cover
				url={album.cover}
			/>
			<Item
				doc={album}
				className="PaddingHalf"
				upper={<DocLink doc={album}/>}
				lower={<DocLinks ampersand docs={album.artists}/>}
			/>
		</div>
	) : (
		<Item
			doc={album}
			imgDoc={album}
			upper={<DocLink doc={album}/>}
			lower={<DocLinks docs={album.artists}/>}
			className={[ className, "PaddingHalf", "ItemBorder", "Hover" ].join(" ")}
		/>
	)
}

interface PropTypes {
	album: AlbumType,
	className?: string,
}

export default Album