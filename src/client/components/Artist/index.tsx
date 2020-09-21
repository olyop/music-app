import { createElement, FC } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import { useStateListStyle } from "../../redux"
import { artistLower, uuidRemoveDashes } from "../../helpers"
import { Artist as ArtistType, ListStyle } from "../../types"

const Artist: FC<PropTypes> = ({ artist, className, alwaysList = false }) => {
	const listStyle = useStateListStyle()
	const upper = <DocLink doc={artist}/>
	const lower = artistLower(artist)
	return listStyle === ListStyle.LIST || alwaysList ? (
		<Item
			doc={artist}
			upper={upper}
			lower={lower}
			imgDoc={artist}
			className={[ className, "PaddingHalf", "ItemBorder", "Hover" ].join(" ")}
		/>
	) : (
		<div className={[ className, "Card", "Elevated" ].join(" ")}>
			<Cover
				landscape
				url={artist.photo}
				link={`/artist/${uuidRemoveDashes(artist.artistId)}`}
			/>
			<Item
				doc={artist}
				upper={upper}
				lower={lower}
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