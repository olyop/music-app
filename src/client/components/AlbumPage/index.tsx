import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { createElement, Fragment, FC } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import Disc from "../Disc"
import Cover from "../Cover"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import DocLinks from "../DocLinks"
import { Album, UserVar } from "../../types"
import { determineDiscs } from "../../helpers"
import InLibraryButton from "../InLibraryButton"
import { useStateUserId } from "../../redux"
import QUERY_ALBUM_PAGE from "../../graphql/queries/albumPage.gql"

import "./index.scss"

const bem = createBem("AlbumPage")

const AlbumPage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	return (
		<QueryApi<Data, Vars>
			query={QUERY_ALBUM_PAGE}
			className={bem("", "Padding")}
			variables={{ userId, ...params }}
			children={
				({ data }) => {
					if (!data) return null
					const { album } = data
					const { title, songs, released, artists, totalDuration } = album
					const discs = determineDiscs(songs)
					return (
						<Helmet title={title}>
							<Cover
								url={album.cover}
								link={`/album/${album.albumId}`}
								className="Card MarginBottom Elevated"
							/>
							<div>
								<h1 className={bem("title")}>
									<span>{title}</span>
									<InLibraryButton
										doc={album}
										className={bem("title-add")}
									/>
								</h1>
								<h2 className={bem("artists", "MarginBottomHalf")}>
									<DocLinks docs={artists}/>
								</h2>
								<h3 className={bem("genres", "MarginBottom")}>
									<DocLinks docs={album.genres}/>
								</h3>
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
									{released}
								</p>
							</div>
						</Helmet>
					)
				}
			}
		/>
	)
}

interface Data {
	album: Album,
}

interface Params {
	albumId: string,
}

interface Vars extends Params, UserVar {}

export default AlbumPage