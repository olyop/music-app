import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { createElement, Fragment, FC } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import {
	uuidAddDashes,
	determineDiscs,
	dataUrlToObjectUrl,
} from "../../helpers"

import Img from "../Img"
import Disc from "./Disc"
import Button from "../Button"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import DocLinks from "../DocLinks"
import { useStateUserId } from "../../redux"
import SHUFFLE_ALBUM from "./shuffleAlbum.gql"
import GET_ALBUM_PAGE from "./getAlbumPage.gql"
import { Album, User, UserVar } from "../../types"

import "./index.scss"

const bem = createBem("AlbumPage")

const AlbumPage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const albumId = uuidAddDashes(params.albumId)
	const variables: MutationVars = { userId, albumId }
	const [ shuffle ] = useMutation<User, MutationVars>(SHUFFLE_ALBUM, { variables })
	return (
		<QueryApi<Data, QueryVars>
			query={GET_ALBUM_PAGE}
			className={bem("", "Content")}
			variables={{ userId, albumId }}
			children={({ data }) => data && (
				<Helmet title={data.album.title}>
					<Img
						url={data.album.cover}
						className={bem("cover", "Card Elevated")}
						onClick={() => window.open(dataUrlToObjectUrl(data.album.cover))}
					/>
					<div>
						<h1 className={bem("title", "Heading1")}>
							{data.album.title}
						</h1>
						<h2 className={bem("artists", "MarginBottomHalf")}>
							<DocLinks docs={data.album.artists}/>
						</h2>
						<h3 className={bem("genres", "MarginBottom")}>
							<DocLinks docs={data.album.genres}/>
						</h3>
						<details open>
							<summary className={bem("sum", "Text MarginBottomHalf")}>
								Songs
							</summary>
							<div className={bem("discs", "MarginBottomThreeQuart")}>
								{determineDiscs(data.album.songs).map(disc => (
									<Disc
										disc={disc}
										key={disc.number}
									/>
								))}
							</div>
							<Button
								icon="shuffle"
								text="Shuffle"
								className="MarginBottom"
								onClick={() => shuffle()}
							/>
						</details>
						<details open>
							<summary className={bem("sum", "Text MarginBottomHalf")}>
								Details
							</summary>
							<p className={bem("footer-text")}>
								<Fragment>Released: </Fragment>
								{data.album.released}
							</p>
							<p className={bem("footer-text")}>
								<Fragment>Duration: </Fragment>
								{deserializeDuration(data.album.duration, true)}
							</p>
						</details>
					</div>
				</Helmet>
			)}
		/>
	)
}

interface Data {
	album: Album,
}

interface Params {
	albumId: string,
}

interface MutationVars extends UserVar {
	albumId: string,
}

interface QueryVars extends Params, UserVar {}

export default AlbumPage