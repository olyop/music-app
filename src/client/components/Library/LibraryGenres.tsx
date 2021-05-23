import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"

import Feed from "../Feed"
import Genres from "../Genres"
import Helmet from "../Helmet"
import LibraryEmpty from "./LibraryEmpty"
import { useStateOrderBy } from "../../redux"
import GET_USER_GENRES from "./getUserGenres.gql"
import { User, GenresOrderBy, GenresOrderByField } from "../../types"

const LibraryGenres: FC = () => {
	const orderBy = useStateOrderBy<GenresOrderByField>("genres")
	return (
		<Helmet title="Library Genres">
			<Feed<Res, Vars>
				query={GET_USER_GENRES}
				variables={{ orderBy }}
				dataToDocsLength={({ user }) => user.genres.length}
				children={data => (data && isEmpty(data.user.genres) ? (
					<LibraryEmpty name="genres"/>
				) : (
					<Genres
						className="Content"
						genres={data?.user.genres}
						hideOrderBy={isEmpty(data?.user.genres)}
						orderByFields={Object.keys(GenresOrderByField)}
					/>
				))}
			/>
		</Helmet>
	)
}

interface Res {
	user: User,
}

interface Vars {
	orderBy: GenresOrderBy,
}

export default LibraryGenres