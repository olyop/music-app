import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { createElement, FC, Fragment } from "react"

import {
	Genre,
	UserVar,
	SongsOrderBy,
	SongsOrderByField,
} from "../../types"

import Songs from "../Songs"
import Helmet from "../Helmet"
import GET_GENRE_PAGE from "./getGenrePage.gql"
import { useQuery, uuidAddDashes } from "../../helpers"
import { useStateUserId, useStateOrderBy } from "../../redux"

import "./index.scss"

const bem = createBem("GenrePage")

const GenrePage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const genreId = uuidAddDashes(params.genreId)
	const songsOrderBy = useStateOrderBy<SongsOrderByField>("songs")
	const variables: Vars = { userId, songsOrderBy, genreId }
	const { data } = useQuery<Data, Vars>(GET_GENRE_PAGE, { variables })
	return (
		<Fragment>
			{data && (
				<Helmet title={data.genre.name}>
					<h1
						children={data.genre.name}
						className={bem("", "Elevated")}
					/>
					<Songs
						orderByKey="songs"
						songs={data.genre.songs}
						className="Content MarginBottom"
						orderByFields={Object.keys(SongsOrderByField)}
					/>
				</Helmet>
			)}
		</Fragment>
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