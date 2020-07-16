import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import List from "../List"
import Genre from "../Genre"
import OrderBy from "../OrderBy"
import { GenreOrderByField, Genre as GenreType } from "../../types"

const bem = createBem("Songs")

const Genres: FC<PropTypes> = ({ genres, className }) => (
	<div className={bem(className, "")}>
		<OrderBy
			className="MarginBottom"
			settingsKey="genresOrderBy"
			fieldOptions={Object.keys(GenreOrderByField)}
		/>
		<List>
			{genres.map(
				genre => (
					<Genre
						genre={genre}
						key={genre.genreId}
					/>
				),
			)}
		</List>
	</div>
)

interface PropTypes {
	genres: GenreType[],
	className?: BemInput,
}

export default Genres