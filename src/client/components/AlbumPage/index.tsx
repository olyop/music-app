import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { createElement, Fragment, FC } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import {
	useQuery,
	useMutation,
	uuidAddDashes,
	determineDiscs,
	dataUrlToObjectUrl,
} from "../../helpers"

import Img from "../Img"
import Disc from "./Disc"
import Button from "../Button"
import Helmet from "../Helmet"
import DocLinks from "../DocLinks"
import { useStateUserId } from "../../redux"
import SHUFFLE_ALBUM from "./shuffleAlbum.gql"
import GET_ALBUM_PAGE from "./getAlbumPage.gql"
import { Song, Album, User, UserVar } from "../../types"
import ADD_USER_SONG from "../../helpers/useInLibrary/addUserSong.gql"

import "./index.scss"

const bem = createBem("AlbumPage")

const AlbumPage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()

	const albumId = uuidAddDashes(params.albumId)
	const variables: Vars = { userId, albumId }

	const { data } =
		useQuery<Data, Vars>(GET_ALBUM_PAGE, { variables })

	const [ add, { loading: addLoading } ] =
		useMutation<Song, AddVars>(ADD_USER_SONG)

	const [ shuffle, { loading: shuffleLoading } ] =
		useMutation<User, Vars>(SHUFFLE_ALBUM, { variables })

	const handleShuffle = async () => {
		await shuffle()
	}

	const handleAdd = async () => {
		if (data) {
			await Promise.all(
				data.album.songs
					.filter(({ inLibrary }) => !inLibrary)
					.map(({ songId }) => add({
						variables: { userId, songId },
					})),
			)
		}
	}

	return (
		<div className={bem("", "Content")}>
			{data && (
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

interface AddVars extends UserVar {
	songId: string,
}

interface Vars extends Params, UserVar {}

export default AlbumPage