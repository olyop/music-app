import { createElement, FC } from "react"

import List from "../List"
import Genre from "../Genre"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Genre as GenreType } from "../../types"
import GET_GENRES from "../../graphql/queries/genres.gql"

const BrowseGenres: FC = () => (
	<Helmet title="Browse Genres">
		<QueryApi
			query={GET_GENRES}
			children={
				({ genres }: Data) => (
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
	</Helmet>
)

interface Data {
	genres: GenreType[],
}

export default BrowseGenres