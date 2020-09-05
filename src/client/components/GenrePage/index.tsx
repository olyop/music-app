import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { useParams } from "react-router-dom"

import {
	Genre,
	UserVar,
	SongsOrderBy,
	SongsOrderByField,
} from "../../types"

import Songs from "../Songs"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { useStateUserId, useStateOrderBy } from "../../redux"
import GET_GENRE_PAGE from "../../graphql/queries/genrePage.gql"

import "./index.scss"

const bem = createBem("GenrePage")

const GenrePage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const songsOrderBy = useStateOrderBy<SongsOrderBy>("songs")
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
							className="Margin"
							orderByKey="songs"
							songs={data.genre.songs}
							orderByFields={Object.keys(SongsOrderByField)}
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
	songsOrderBy: SongsOrderBy,
}

export default GenrePage