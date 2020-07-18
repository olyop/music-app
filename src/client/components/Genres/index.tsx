import { createElement, FC } from "react"

import {
	OrderByIgnore,
	GenreOrderByField,
	Genre as GenreType,
} from "../../types"

import List from "../List"
import Genre from "../Genre"
import OrderBy from "../OrderBy"
import { enumToString } from "../../helpers"

const Genres: FC<PropTypes> = ({ genres, className, orderByIgnore }) => (
	<div className={className}>
		<OrderBy
			className="MarginBottom"
			settingsKey="genresOrderBy"
			fieldOptions={enumToString(GenreOrderByField, orderByIgnore)}
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
	className?: string,
	genres: GenreType[],
	orderByIgnore?: OrderByIgnore,
}

export default Genres