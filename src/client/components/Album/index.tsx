import { createElement, FC } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import { useListStyleContext } from "../../contexts/ListStyle"
import { Album as TAlbum, ListStyleEnum } from "../../types"

type PropTypes = {
	album: TAlbum,
	className?: string,
}

const Album: FC<PropTypes> = ({ album, className = null }) => {
	const { listStyle } = useListStyleContext()
	return listStyle === ListStyleEnum.grid ? (
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

export default Album