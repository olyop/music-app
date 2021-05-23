import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { createElement, Fragment, FC } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import {
	useQuery,
	useMutation,
	usePlayAlbum,
	useAlbumShuffle,
} from "../../hooks"

import Img from "../Img"
import Disc from "./Disc"
import Icon from "../Icon"
import Button from "../Button"
import Helmet from "../Helmet"
import DocLinks from "../DocLinks"
import { Song, Album } from "../../types"
import GET_ALBUM_PAGE from "./getAlbumPage.gql"
import ADD_USER_SONG from "../../hooks/useToggleInLibrary/addUserSong.gql"
import { uuidAddDashes, getCatalogImg, determineDiscs } from "../../helpers"

import "./index.scss"

const bem = createBem("AlbumPage")

const AlbumPage: FC = () => {
	const params = useParams<Params>()
	const albumId = uuidAddDashes(params.albumId)
	const variables: Params = { albumId }

	const [ playAlbum, isPlaying ] =
		usePlayAlbum(albumId)

	const { data } =
		useQuery<Data, Params>(GET_ALBUM_PAGE, { variables })

	const [ add, { loading: addLoading } ] =
		useMutation<Song, AddVars>(ADD_USER_SONG)

	const [ handleShuffle, { loading: shuffleLoading } ] =
		useAlbumShuffle(albumId)

	const handlePlay =
		async () => {
			await playAlbum()
		}

	const handleAdd =
		async () => {
			if (data) {
				await Promise.all(
					data.album.songs
						  .filter(({ inLibrary }) => !inLibrary)
						  .map(({ songId }) => add({ variables: { songId } })),
				)
			}
		}

	return (
		<div className={bem("", "Content PaddingTopBottom")}>
			{data && (
				<Helmet title={data.album.title}>
					<Img
						className="Card Elevated"
						url={getCatalogImg(data.album.albumId)}
					/>
					<div>
						<div className="FlexList MarginBottomHalf">
							<Icon
								onClick={handlePlay}
								className={bem("play")}
								icon={isPlaying ? "pause" : "play_arrow"}
							/>
							<h1 className="Heading1">
								{data.album.title}
							</h1>
						</div>
						<h2 className="Heading2 MarginBottomHalf">
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
							<div className="FlexListGap MarginBottom">
								<Button
									icon="add"
									text="Add"
									onClick={addLoading ? undefined : handleAdd}
								/>
								<Button
									icon="shuffle"
									text="Shuffle"
									onClick={shuffleLoading ? undefined : handleShuffle}
								/>
							</div>
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
		</div>
	)
}

interface Data {
	album: Album,
}

interface Params {
	albumId: string,
}

interface AddVars{
	songId: string,
}

export default AlbumPage