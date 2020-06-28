import { createElement, FC } from "react"
import { RouteComponentProps } from "react-router-dom"

import List from "../List"
import Genre from "../Genre"
import QueryApi from "../QueryApi"
import { Genre as TGenre } from "../../types"
import GET_GENRES from "../../graphql/queries/genres.gql"

const BrowseGenres: FC<RouteComponentProps> = () => (
	<QueryApi<TData>
		query={GET_GENRES}
		children={
			({ genres }) => (
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
			)
		}
	/>
)

type TData = {
	genres: TGenre[],
}

export default BrowseGenres