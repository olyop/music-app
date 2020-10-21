import { createElement, FC } from "react"

import {
	User,
	UserVar,
	GenreOrderBy,
	GenresOrderByField,
} from "../../types"

import Feed from "../Feed"
import Albums from "../Albums"
import Helmet from "../Helmet"
import GET_USER_ALBUMS from "./getUserAlbums.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"

const LibraryArtists: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<GenresOrderByField>("genres")
	return (
		<Helmet title="Library Albums">
			<Feed<Res, Vars>
				query={GET_USER_ALBUMS}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ user }) => user.albums.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					user: {
						...existing.user,
						albums: [
							...existing.user.albums,
							...incoming.user.albums,
						],
					},
				})}
				children={data => (
					<Genres
						className="Content"
						// orderByKey=""
						genres={data?.user.albums || []}
						// orderByFields={Object.keys(GenresOrderByField)}
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
	orderBy: GenreOrderBy,
}

export default LibraryArtists