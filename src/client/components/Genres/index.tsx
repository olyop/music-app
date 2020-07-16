import { createElement, FC } from "react"

import List from "../List"
import Genre from "../Genre"
import OrderBy from "../OrderBy"
import { GenreOrderByField, Genre as GenreType } from "../../types"

const Genres: FC<PropTypes> = ({ genres, className }) => (
	<div className={className}>
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
	className?: string,
	genres: GenreType[],
}

export default Genres