import { createElement, FC } from "react"

import Item from "../Item"
import DocLink from "../DocLink"
import { determinePlural } from "../../helpers"
import { useListStyleContext } from "../../contexts/ListStyle"
import { ListStyleEnum, Genre as GenreType } from "../../types"

interface PropTypes {
	genre: GenreType,
}

const genreLower = ({ numOfSongs }: GenreType) =>
	(numOfSongs ?
		`${numOfSongs ? `${numOfSongs} song${determinePlural(numOfSongs)}` : ""}` :
		null)

const Genre: FC<PropTypes> = ({ genre }) => {
	const { listStyle } =
		useListStyleContext()
	const classNames = listStyle === ListStyleEnum.grid ?
		[ "Card", "Elevated" ] : [ "ItemBorder", "Hover" ]
	return (
		<Item
			doc={genre}
			lower={genreLower(genre)}
			upper={<DocLink doc={genre}/>}
			className={classNames.concat("PaddingHalf").join(" ")}
		/>
	)
}

export default Genre