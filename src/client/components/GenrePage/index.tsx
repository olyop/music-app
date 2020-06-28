import { useParams } from "react-router-dom"
import { createElement, FC, Fragment } from "react"

import Song from "../Song"
import QueryApi from "../QueryApi"
import { Genre } from "../../types"
import { reactBem } from "../../helpers"
import GET_GENRE_PAGE from "../../graphql/queries/genrePage.gql"

import "./index.scss"

const bem = reactBem("GenrePage")

const GenrePage: FC = () => (
	<div className={bem("")}>
		<QueryApi<TData>
			query={GET_GENRE_PAGE}
			variables={useParams()}
			children={
				({ genre }) => {
					const { name, songs } = genre
					return (
						<Fragment>
							<h1 className={bem("name", "Elevated")}>{name}</h1>
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

type TData = {
	genre: Genre,
}

export default GenrePage