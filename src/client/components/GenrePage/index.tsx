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
import { uuidAddDashes } from "../../helpers"
import GET_GENRE_PAGE from "./getGenrePage.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"

import "./index.scss"

const bem = createBem("GenrePage")

const GenrePage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const genreId = uuidAddDashes(params.genreId)
	const songsOrderBy = useStateOrderBy<SongsOrderByField>("songs")
	return (
		<QueryApi<Data, Vars>
			variables={{ userId, songsOrderBy, genreId }}
			query={GET_GENRE_PAGE}
			children={({ data }) => data && (
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
			)}
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