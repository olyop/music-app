import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { createElement, FC, Fragment } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import Cover from "../Cover"
import Helmet from "../Helmet"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"
import { Song, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import GET_SONG_PAGE from "./getSongPage.gql"
import FeaturingArtists from "../FeaturingArtists"
import { useQuery, uuidAddDashes, uuidRemoveDashes } from "../../helpers"

import "./index.scss"

const bem = createBem("SongPage")

const SongPage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const songId = uuidAddDashes(params.songId)
	const variables: Vars = { songId, userId }
	const { data } = useQuery<Data, Vars>(GET_SONG_PAGE, { variables })
	return (
		<div className={bem("", "Padding")}>
			{data && (
				<Helmet title={data.song.title}>
					<Cover
						className="Card Elevated"
						url={data.song.album.cover}
						title={data.song.album.title}
						link={`/album/${uuidRemoveDashes(data.song.album.albumId)}`}
					/>
					<div className={bem("content")}>
						<h1 className={bem("content-title", "MarginBottomHalf")}>
							<SongTitle song={data.song}/>
						</h1>
						<h3 className="Text2 MarginBottomHalf">
							<FeaturingArtists song={data.song}/>
						</h3>
						<h3 className="Text2 MarginBottomHalf">
							<DocLinks docs={data.song.genres}/>
						</h3>
						<h4 className="Text">
							Released:
							<Fragment> </Fragment>
							{data.song.album.released}
						</h4>
						<h4 className="Text">
							Duration:
							<Fragment> </Fragment>
							{deserializeDuration(data.song.duration)}
						</h4>
						<h4 className="Text">
							Size:
							<Fragment> </Fragment>
							{(data.song.size * 1e-6).toFixed(2)}
							<Fragment> MB</Fragment>
						</h4>
						<h4 className="Text">
							BPM:
							<Fragment> </Fragment>
							{data.song.bpm}
							<Fragment> BPM</Fragment>
						</h4>
						<h4 className="Text">
							Key:
							<Fragment> </Fragment>
							{data.song.key.sharp}
						</h4>
					</div>
				</Helmet>
			)}
		</div>
	)
}

interface Data {
	song: Song,
}

interface Params {
	songId: string,
}

interface Vars extends UserVar {
	songId: string,
}

export default SongPage