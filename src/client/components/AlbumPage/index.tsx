import { createElement, Fragment, FC } from "react"
import { RouteComponentProps } from "react-router-dom"

import Disc from "../Disc"
import Cover from "../Cover"
import Button from "../Button"
import QueryApi from "../QueryApi"
import DocLinks from "../DocLinks"
import { Album } from "../../types"
import genresFromAlbum from "./genresFromAlbum"
import InLibraryButton from "../InLibraryButton"
import QUERY_ALBUM_PAGE from "../../graphql/queries/albumPage.gql"

import {
	reactBem,
	determineDiscs,
	deserializeDate,
	deserializeDuration,
} from "../../helpers"

import "./index.scss"

const bem = reactBem("AlbumPage")

const AlbumPage: FC<RouteComponentProps> = ({ match }) => (
	<QueryApi<TData>
		query={QUERY_ALBUM_PAGE}
		variables={match.params}
		className={bem("", "Padding")}
		children={
			({ album }) => {
				const { title, songs, released, artists, totalDuration } = album
				return (
					<Fragment>
						<div>
							<Cover
								url={album.cover}
								className="Card MarginBottom Elevated"
							/>
							<Button
								text="Shuffle"
							/>
						</div>
						<div>
							<h1 className={bem("title")}>
								<span>{title}</span>
								<InLibraryButton
									doc={album}
									className={bem("title-add")}
								/>
							</h1>
							<h3 className={bem("genres")}>
								<DocLinks docs={genresFromAlbum(album)}/>
							</h3>
							<h2 className={bem("artists", "MarginBottom")}>
								<DocLinks docs={artists}/>
							</h2>
							<div className={bem("discs", "MarginBottom")}>
								{determineDiscs(songs).map(
									disc => (
										<Disc key={disc.number} disc={disc}/>
									),
								)}
							</div>
							<p className={bem("footer-text")}>
								{deserializeDuration(totalDuration, true)}
								<Fragment> - </Fragment>
								{deserializeDate(released)}
							</p>
						</div>
					</Fragment>
				)
			}
		}
	/>
)

type TData = {
	album: Album,
}

export default AlbumPage