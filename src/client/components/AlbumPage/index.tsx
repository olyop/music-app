import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { createElement, Fragment, FC } from "react"

import Disc from "../Disc"
import Cover from "../Cover"
import Helmet from "../Helmet"
import Button from "../Button"
import QueryApi from "../QueryApi"
import DocLinks from "../DocLinks"
import { Album } from "../../types"
import genresFromAlbum from "./genresFromAlbum"
import InLibraryButton from "../InLibraryButton"
import QUERY_ALBUM_PAGE from "../../graphql/queries/albumPage.gql"
import { determineDiscs, deserializeDate, deserializeDuration } from "../../helpers"

import "./index.scss"

const bem = createBem("AlbumPage")

const AlbumPage: FC = () => (
	<QueryApi
		query={QUERY_ALBUM_PAGE}
		className={bem("", "Padding")}
		variables={useParams<Params>()}
		children={
			({ album }: Data) => {
				const { title, songs, released, artists, totalDuration } = album
				const discs = determineDiscs(songs)
				return (
					<Helmet title={title}>
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
								{discs.map(disc => (
									<Disc
										disc={disc}
										key={disc.number}
									/>
								))}
							</div>
							<p className={bem("footer-text")}>
								{deserializeDuration(totalDuration, true)}
								<Fragment> - </Fragment>
								{deserializeDate(released)}
							</p>
						</div>
					</Helmet>
				)
			}
		}
	/>
)

interface Data {
	album: Album,
}

interface Params extends Record<string, string> {
	albumId: string,
}

export default AlbumPage