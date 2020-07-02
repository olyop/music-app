import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { createElement, FC, Fragment } from "react"

import Song from "../Song"
import QueryApi from "../QueryApi"
import { Genre } from "../../types"
import GET_GENRE_PAGE from "../../graphql/queries/genrePage.gql"

import "./index.scss"

const bem = createBem("GenrePage")

const GenrePage: FC = () => (
	<div className={bem("")}>
		<QueryApi<Data>
			query={GET_GENRE_PAGE}
			variables={useParams()}
			children={
				({ genre }) => {
					const { name, songs } = genre
					return (
						<Fragment>
							<h1 className={bem("name", "Elevated")}>
								{name}
							</h1>
							<div className="Padding">
								<div className="Elevated">
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
							</div>
						</Fragment>
					)
				}
			}
		/>
	</div>
)

interface Data {
	genre: Genre,
}

export default GenrePage