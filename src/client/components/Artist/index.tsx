import { createElement, FC } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import { artistLower } from "../../helpers"
import { useStateListStyle } from "../../redux"
import { Artist as ArtistType, ListStyle } from "../../types"

const Artist: FC<PropTypes> = ({ artist, className }) => {
	const listStyle = useStateListStyle()
	const upper = <DocLink doc={artist}/>
	const lower = artistLower(artist)
	return listStyle === ListStyle.GRID ? (
		<div className={[ className, "Card", "Elevated" ].join(" ")}>
			<Cover
				landscape
				url={artist.photo}
				link={`/artist/${artist.artistId}`}
			/>
			<Item
				doc={artist}
				upper={upper}
				lower={lower}
				className="PaddingHalf"
			/>
		</div>
	) : (
		<Item
			doc={artist}
			upper={upper}
			lower={lower}
			imgDoc={artist}
			className={[ className, "PaddingHalf", "ItemBorder", "Hover" ].join(" ")}
		/>
	)
}

interface PropTypes {
	artist: ArtistType,
	className?: string,
}

export default Artist