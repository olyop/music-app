import { createElement, FC } from "react"
import { BemPropTypes } from "@oly_op/bem"

import Item from "../Item"
import { Genre } from "../../types"

const Genre: FC<PropTypes> = ({ genre }) => (
	<Item
		doc={genre}
		hideInLibrary
		upper={genre.name}
		className="PaddingHalf Hover ItemBorder"
	/>
)

interface PropTypes extends BemPropTypes {
	genre: Genre,
}

export default Genre