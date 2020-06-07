import { toString } from "lodash"
import { createElement, FC } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import { determinePlural } from "../../helpers"
import { useListStyleContext } from "../../contexts/ListStyle"
import { Artist as TArtist, ListStyleEnum } from "../../types"

const artistLower = ({ numOfSongs, numOfAlbums }: TArtist) =>
	(numOfSongs || numOfAlbums ? `
		${numOfAlbums ? `${toString(numOfAlbums)} album${determinePlural(numOfAlbums)}, ` : ""}
		${numOfSongs ? `${toString(numOfSongs)} song${determinePlural(numOfSongs)}` : ""}
	` : null)

const Artist: FC<PropTypes> = ({ artist, className = null }) => {
	const { listStyle } = useListStyleContext()
	return listStyle === ListStyleEnum.grid ? (
		<div className={[ className, "Card", "Elevated" ].join(" ")}>
			<Cover
				landscape
				url={artist.photo}
			/>
			<Item
				doc={artist}
				className="PaddingHalf"
				lower={artistLower(artist)}
				upper={<DocLink doc={artist}/>}
			/>
		</div>
	) : (
		<Item
			doc={artist}
			imgDoc={artist}
			lower={artistLower(artist)}
			upper={<DocLink doc={artist}/>}
			className={[ className, "PaddingHalf", "ItemBorder", "Hover" ].join(" ")}
		/>
	)
}

type PropTypes = {
	artist: TArtist,
	className?: string,
}

export default Artist