import { createElement, FC } from "react"

import {
	UserVar,
	GenresOrderBy,
	Genre as TGenre,
	GenresOrderByField,
} from "../../types"

import Feed from "../Feed"
import Genres from "../Genres"
import Helmet from "../Helmet"
import GET_GENRES from "./getGenres.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"

const BrowseGenres: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<GenresOrderByField>("artists")
	return (
		<Helmet title="Browse Genres">
			<Feed<Data, Vars>
				query={GET_GENRES}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ genres }) => genres.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					songs: [
						...existing.genres,
						...incoming.genres,
					],
				})}
				children={data => (
					<Genres
						className="Content"
						genres={data?.genres || []}
						orderByFields={Object.keys(GenresOrderByField)}
					/>
				)}
			/>
		</Helmet>
	)
}

interface Data {
	genres: TGenre[],
}

interface Vars extends UserVar {
	orderBy: GenresOrderBy,
}

export default BrowseGenres