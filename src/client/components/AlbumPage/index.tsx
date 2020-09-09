import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { createElement, Fragment, FC } from "react"
import dataUrlToBlob from "@oly_op/music-app-common/dataUrlToBlob"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import Img from "../Img"
import Disc from "../Disc"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import DocLinks from "../DocLinks"
import { Album, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import { determineDiscs } from "../../helpers"
import QUERY_ALBUM_PAGE from "../../graphql/queries/albumPage.gql"

import "./index.scss"

const bem = createBem("AlbumPage")

const AlbumPage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	return (
		<QueryApi<Data, Vars>
			query={QUERY_ALBUM_PAGE}
			variables={{ userId, ...params }}
			className={bem("", "Padding Content")}
			children={
				({ data }) => {
					if (!data) return null
					const { album } = data
					const { title, songs, released, artists, totalDuration } = album
					const discs = determineDiscs(songs)
					const handleCoverClick = () =>
						window.open(URL.createObjectURL(dataUrlToBlob(album.cover)))
					return (
						<Helmet title={title}>
							<Img
								url={album.cover}
								onClick={handleCoverClick}
								className={bem("cover", "Card Elevated")}
							/>
							<div>
								<h1 className={bem("title")}>
									{title}
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
								<details open>
									<summary className={bem("footer-sum", "Text MarginBottomHalf")}>
										Details
									</summary>
									<p className={bem("footer-text")}>
										<Fragment>Released: </Fragment>
										{released}
									</p>
									<p className={bem("footer-text")}>
										<Fragment>Duration: </Fragment>
										{deserializeDuration(totalDuration, true)}
									</p>
								</details>
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