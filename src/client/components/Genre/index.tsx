import { createElement, FC } from "react"
import { BemPropTypes } from "@oly_op/bem"

import Item from "../Item"
import DocLink from "../DocLink"
import { Genre as TGenre } from "../../types"

const Genre: FC<PropTypes> = ({ genre, className }) => (
	<Item
		className={className}
		info={{ upperLeft: <DocLink doc={genre}/> }}
	/>
)

interface PropTypes extends BemPropTypes {
	genre: TGenre,
}

export default Genre