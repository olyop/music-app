import orderBy from "lodash/orderBy"
import { createElement, FC } from "react"

import List from "../List"
import Genre from "../Genre"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import GET_USER_GENRES from "../../graphql/queries/userGenres.gql"

const LibraryGenres: FC = () => (
	<Helmet title="Library Genres">
		<QueryApi
			query={GET_USER_GENRES}
			children={
				({ user: { genres } }: Data) => (
					<List>
						{orderBy(genres, "dateAdded", "desc").map(
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
	user: User,
}

export default LibraryGenres