import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { createElement, Fragment, FC } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import Img from "../Img"
import Disc from "./Disc"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import DocLinks from "../DocLinks"
import { Album, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import QUERY_ALBUM_PAGE from "../../graphql/queries/albumPage.gql"
import { determineDiscs, uuidAddDashes, dataUrlToObjectUrl } from "../../helpers"

import "./index.scss"

const bem = createBem("AlbumPage")

const AlbumPage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const albumId = uuidAddDashes(params.albumId)
	return (
		<QueryApi<Data, Vars>
			query={QUERY_ALBUM_PAGE}
			className={bem("", "Content")}
			variables={{ userId, albumId }}
			children={
				({ data }) => data && (
					<Helmet title={data.album.title}>
						<Img
							url={data.album.cover}
							className={bem("cover", "Card Elevated")}
							onClick={() => window.open(dataUrlToObjectUrl(data.album.cover))}
						/>
						<div>
							<h1 className={bem("title")}>
								{data.album.title}
							</h1>
							<h2 className={bem("artists", "MarginBottomHalf")}>
								<DocLinks docs={data.album.artists}/>
							</h2>
							<h3 className={bem("genres", "MarginBottom")}>
								<DocLinks docs={data.album.genres}/>
							</h3>
							<div className={bem("discs", "MarginBottom")}>
								{determineDiscs(data.album.songs).map(disc => (
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
									{data.album.released}
								</p>
								<p className={bem("footer-text")}>
									<Fragment>Duration: </Fragment>
									{deserializeDuration(data.album.totalDuration, true)}
								</p>
							</details>
						</div>
					</Helmet>
				)
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