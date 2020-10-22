import { createElement, FC } from "react"

import {
	User,
	UserVar,
	GenresOrderBy,
	GenresOrderByField,
} from "../../types"

import Feed from "../Feed"
import Genres from "../Genres"
import Helmet from "../Helmet"
import GET_USER_GENRES from "./getUserGenres.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"

const LibraryArtists: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<GenresOrderByField>("genres")
	return (
		<Helmet title="Library Genres">
			<Feed<Res, Vars>
				query={GET_USER_GENRES}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ user }) => user.genres.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					user: {
						...existing.user,
						genres: [
							...existing.user.genres,
							...incoming.user.genres,
						],
					},
				})}
				children={data => (
					<Genres
						className="Content"
						genres={data?.user.genres || []}
						orderByFields={Object.keys(GenresOrderByField)}
					/>
				)}
			/>
		</Helmet>
	)
}

interface Res {
	user: User,
}

interface Vars extends UserVar {
	orderBy: GenresOrderBy,
}

export default LibraryArtists