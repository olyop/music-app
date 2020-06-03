import { createElement, FC } from "react"

import Item from "../Item"
import DocLink from "../DocLink"
import { determinePlural } from "../../helpers"
import { ListStyleEnum, Genre as TGenre } from "../../types"
import { useListStyleContext } from "../../contexts/ListStyle"

const genreLower = ({ numOfSongs }: TGenre) =>
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

type PropTypes = {
	genre: TGenre,
}

export default Genre