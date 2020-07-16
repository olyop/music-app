import { createElement, FC } from "react"

import Genres from "../Genres"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Genre as GenreType } from "../../types"
import GET_GENRES from "../../graphql/queries/genres.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseGenres: FC = () => {
	const { settings: { genresOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Browse Genres">
			<QueryApi
				query={GET_GENRES}
				variables={{ orderBy: genresOrderBy }}
				children={
					(res: Res | undefined) => (
						res && <Genres genres={res.genres}/>
					)
				}
			/>
		</Helmet>
	)
}

interface Res {
	genres: GenreType[],
}

export default BrowseGenres