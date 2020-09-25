import { createElement, FC } from "react"

import Genres from "../Genres"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import GET_GENRES from "./getGenres.gql"
import { Genre as TGenre } from "../../types"

const BrowseGenres: FC = () => (
	<Helmet title="Browse Genres">
		<QueryApi<Data>
			query={GET_GENRES}
			className="Content"
			children={({ data }) => <Genres genres={data?.genres || []}/>}
		/>
	</Helmet>
)

interface Data {
	genres: TGenre[],
}

export default BrowseGenres