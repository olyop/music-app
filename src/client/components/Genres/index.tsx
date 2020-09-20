import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Genre from "../Genre"
import { Genre as TGenre } from "../../types"

const bem = createBem("Genre")

const Genres: FC<PropTypes> = ({ genres, className }) => (
	<div className={bem(className, "Elevated")}>
		{genres.map(
			genre => (
				<Genre
					genre={genre}
					key={genre.genreId}
				/>
			),
		)}
	</div>
)

interface PropTypes extends BemPropTypes {
	genres: TGenre[],
}

export default Genres