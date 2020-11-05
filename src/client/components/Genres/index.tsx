import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Genre from "../Genre"
import OrderBy from "../OrderBy"
import { Genre as TGenre } from "../../types"

const bem = createBem("Genre")

const Genres: FC<PropTypes> = ({
	genres,
	className,
	orderByFields,
	hideOrderBy = false,
}) => (
	<div className={bem(className, isEmpty(genres) || "Elevated")}>
		{hideOrderBy || (
			<OrderBy
				settingsKey="genres"
				fieldOptions={orderByFields}
				className="PaddingHalf ItemBorder FlexListRight"
			/>
		)}
		{genres.map(
			genre => (
				<Genre
					genre={genre}
					key={genre.genreId}
					className="Hover ItemBorder PaddingHalf"
				/>
			),
		)}
	</div>
)

interface PropTypes extends BemPropTypes {
	genres: TGenre[],
	hideOrderBy?: boolean,
	orderByFields: string[],
}

export default Genres