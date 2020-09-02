import { createElement, FC } from "react"
import { BemInput, createBem } from "@oly_op/bem"

import { Genre } from "../../types"

const bem = createBem("Genre")

const Genres: FC<PropTypes> = ({ genres, className }) => (
	<div className={bem(className)}>
		{genres.map(
			({ genreId, name }) => (
				<p
					key={genreId}
					children={name}
					className={bem("PaddingHalf", "Card", "Elevated", "Text", "MarginBottomHalf")}
				/>
			),
		)}
	</div>
)

interface PropTypes {
	genres: Genre[],
	className?: BemInput,
}

export default Genres