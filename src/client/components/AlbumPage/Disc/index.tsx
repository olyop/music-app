import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Songs from "../../Songs"
import { Disc as TDisc } from "../../../types"

import "./index.scss"

const bem = createBem("Disc")

const Disc: FC<PropTypes> = ({ disc: { songs, number, hideLabel } }) => (
	<div className={bem("")}>
		{hideLabel || (
			<h4
				className={bem("number")}
				children={`Disc ${number}`}
			/>
		)}
		<Songs
			hideCover
			hideOrderBy
			songs={songs}
		/>
	</div>
)

interface PropTypes {
	disc: TDisc,
}

export default Disc