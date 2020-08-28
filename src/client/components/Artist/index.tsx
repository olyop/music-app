import { createElement, FC, Fragment } from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import { determinePlural } from "../../helpers"
import { useSettingsContext } from "../../contexts/Settings"
import { Artist as ArtistType, ListStyle } from "../../types"

const ArtistLower: FC<PropTypes> = ({ artist }) => {
	const { numOfSongs, numOfAlbums } = artist
	const albumsText = numOfAlbums ? `${numOfAlbums} album${determinePlural(numOfAlbums)}` : ""
	const songsText = numOfSongs ? `${numOfSongs} song${determinePlural(numOfSongs)}` : ""
	return (
		<Fragment>
			{(numOfSongs || numOfAlbums) && `${albumsText}, ${songsText}`}
		</Fragment>
	)
}

const Artist: FC<PropTypes> = ({ artist, className = null }) => {
	const { settings: { listStyle } } = useSettingsContext()
	return listStyle === ListStyle.GRID ? (
		<div className={[ className, "Card", "Elevated" ].join(" ")}>
			<Cover
				landscape
				url={artist.photo}
			/>
			<Item
				doc={artist}
				className="PaddingHalf"
				upper={<DocLink doc={artist}/>}
				lower={<ArtistLower artist={artist}/>}
			/>
		</div>
	) : (
		<Item
			doc={artist}
			imgDoc={artist}
			upper={<DocLink doc={artist}/>}
			lower={<ArtistLower artist={artist}/>}
			className={[ className, "PaddingHalf", "ItemBorder", "Hover" ].join(" ")}
		/>
	)
}

interface PropTypes {
	artist: ArtistType,
	className?: string,
}

export default Artist