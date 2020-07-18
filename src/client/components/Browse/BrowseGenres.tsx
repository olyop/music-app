import { createElement, FC } from "react"

import Genres from "../Genres"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Genre as GenreType } from "../../types"
import { useUserContext } from "../../contexts/User"
import GET_GENRES from "../../graphql/queries/genres.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseGenres: FC = () => {
	const userId = useUserContext()
	const { settings: { genresOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Browse Genres">
			<QueryApi
				query={GET_GENRES}
				variables={{ userId, orderBy: genresOrderBy }}
				children={(res: Res | undefined) => (
					res && (
						<Genres
							genres={res.genres}
							orderByIgnore={["DATE_ADDED"]}
						/>
					)
				)}
			/>
		</Helmet>
	)
}

interface Res {
	genres: GenreType[],
}

export default BrowseGenres