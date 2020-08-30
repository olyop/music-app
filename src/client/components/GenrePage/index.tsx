import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { useParams } from "react-router-dom"

import {
	Genre,
	UserVar,
	SongOrderBy,
	SongOrderByField,
} from "../../types"

import Songs from "../Songs"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { useUserContext } from "../../contexts/User"
import { useSettingsContext } from "../../contexts/Settings"
import GET_GENRE_PAGE from "../../graphql/queries/genrePage.gql"

import "./index.scss"

const bem = createBem("GenrePage")

const GenrePage: FC = () => {
	const userId = useUserContext()
	const params = useParams<Params>()
	const { settings: { songsOrderBy } } = useSettingsContext()
	const variables = { userId, songsOrderBy, ...params }
	return (
		<QueryApi<Data, Vars>
			variables={variables}
			query={GET_GENRE_PAGE}
			children={
				({ data }) => data && (
					<Helmet title={data.genre.name}>
						<h1
							children={data.genre.name}
							className={bem("", "Elevated")}
						/>
						<Songs
							className="Padding"
							songs={data.genre.songs}
							orderByKey="songsOrderBy"
							orderByFields={Object.keys(SongOrderByField)}
						/>
					</Helmet>
				)
			}
		/>
	)
}

interface Data {
	genre: Genre,
}

interface Params {
	genreId: string,
}

interface Vars extends UserVar, Params {
	songsOrderBy: SongOrderBy,
}

export default GenrePage