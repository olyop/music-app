import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { useParams } from "react-router-dom"

import Song from "../Song"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Genre } from "../../types"
import GET_GENRE_PAGE from "../../graphql/queries/genrePage.gql"

import "./index.scss"

const bem = createBem("GenrePage")

const GenrePage: FC = () => (
	<QueryApi<Data, Params>
		className={bem("")}
		query={GET_GENRE_PAGE}
		variables={useParams()}
		children={
			({ genre: { name, songs } }) => (
				<Helmet title={name}>
					<h1 className={bem("name", "Elevated")}>
						{name}
					</h1>
					<div className="Margin Elevated">
						{songs.map(
							song => (
								<Song
									song={song}
									key={song.songId}
									className="PaddingHalf Hover ItemBorder"
								/>
							),
						)}
					</div>
				</Helmet>
			)
		}
	/>
)

interface Data {
	genre: Genre,
}

interface Params {
	genreId: string,
}

export default GenrePage