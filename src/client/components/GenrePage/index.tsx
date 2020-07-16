import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { useParams } from "react-router-dom"

import Songs from "../Songs"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Genre } from "../../types"
import { useSettingsContext } from "../../contexts/Settings"
import GET_GENRE_PAGE from "../../graphql/queries/genrePage.gql"

import "./index.scss"

const bem = createBem("GenrePage")

const GenrePage: FC = () => {
	const { settings } = useSettingsContext()
	return (
		<QueryApi
			query={GET_GENRE_PAGE}
			variables={{
				...useParams<Params>(),
				songsOrderBy: settings.songsOrderBy,
			}}
			children={
				(res: Res | undefined) => res && (
					<Helmet title={res.genre.name}>
						<h1 className={bem("", "Elevated")}>{res.genre.name}</h1>
						<Songs className="Padding" songs={res.genre.songs}/>
					</Helmet>
				)
			}
		/>
	)
}

interface Res {
	genre: Genre,
}

interface Params {
	genreId: string,
}

export default GenrePage