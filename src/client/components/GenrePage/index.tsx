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
	<QueryApi
		query={GET_GENRE_PAGE}
		variables={useParams<Params>()}
		children={
			({ genre: { name, songs } }: Data) => (
				<Helmet title={name}>
					<h1 className={bem("", "Elevated")}>
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

interface Params extends Record<string, string> {
	genreId: string,
}

export default GenrePage