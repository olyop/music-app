import { createBem } from "@oly_op/bem"
import isUndefined from "lodash/isUndefined"
import { useParams } from "react-router-dom"
import { createElement, Fragment, FC } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import Disc from "../Disc"
import Cover from "../Cover"
import Helmet from "../Helmet"
import Button from "../Button"
import QueryApi from "../QueryApi"
import DocLinks from "../DocLinks"
import { Album, UserVar } from "../../types"
import { determineDiscs } from "../../helpers"
import genresFromAlbum from "./genresFromAlbum"
import InLibraryButton from "../InLibraryButton"
import { useUserContext } from "../../contexts/User"
import QUERY_ALBUM_PAGE from "../../graphql/queries/albumPage.gql"

import "./index.scss"

const bem = createBem("AlbumPage")

const AlbumPage: FC = () => {
	const userId = useUserContext()
	const params = useParams<Params>()
	return (
		<QueryApi<Res, Vars>
			query={QUERY_ALBUM_PAGE}
			className={bem("", "Padding")}
			variables={{ userId, ...params }}
			children={
				res => {
					if (isUndefined(res)) return null
					const { album } = res
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
									icon="shuffle"
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
								<h2 className={bem("artists", "MarginBottomHalf")}>
									<DocLinks docs={artists}/>
								</h2>
								<h3 className={bem("genres", "MarginBottom")}>
									<DocLinks docs={genresFromAlbum(album)}/>
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

interface Res {
	album: Album,
}

interface Params {
	albumId: string,
}

interface Vars extends Params, UserVar {}

export default AlbumPage