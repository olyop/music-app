import { createElement, FC } from "react"

import Item from "../Item"
import DocLink from "../DocLink"
import genreLower from "./genreLower"
import { useSettingsContext } from "../../contexts/Settings"
import { ListStyleEnum, Genre as GenreType } from "../../types"

const Genre: FC<PropTypes> = ({ genre }) => {
	const { settings: { listStyle } } =
		useSettingsContext()
	const classNames = listStyle === ListStyleEnum.GRID ?
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

interface PropTypes {
	genre: GenreType,
}

export default Genre