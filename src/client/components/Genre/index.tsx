import { createElement, FC } from "react"
import { BemPropTypes } from "@oly_op/bem"

import Item from "../Item"
import DocLink from "../DocLink"
import { Genre } from "../../types"

const Genre: FC<PropTypes> = ({ genre }) => (
	<Item
		doc={genre}
		hideInLibrary
		upper={<DocLink doc={genre}/>}
		className="PaddingHalf Hover ItemBorder"
	/>
)

interface PropTypes extends BemPropTypes {
	genre: Genre,
}

export default Genre