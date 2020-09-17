import { createElement, FC } from "react"

import Genres from "../Genres"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Genre as TGenre } from "../../types"
import BROWSE_GENRES from "../../graphql/queries/genres.gql"

const BrowseGenres: FC = () => (
	<Helmet title="Browse Genres">
		<QueryApi<Data>
			className="Content"
			query={BROWSE_GENRES}
			children={({ data }) => <Genres genres={data?.genres || []}/>}
		/>
	</Helmet>
)

interface Data {
	genres: TGenre[],
}

export default BrowseGenres