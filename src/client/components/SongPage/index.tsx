import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { useParams } from "react-router-dom"

import QueryApi from "../QueryApi"
import { Song, UserVar } from "../../types"
import { uuidAddDashes } from "../../helpers"
import { useStateUserId } from "../../redux"
import GET_SONG from "../../graphql/queries/song.gql"

import "./index.scss"

const bem = createBem("SongsPage")

const SongsPage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const songId = uuidAddDashes(params.songId)
	return (
		<QueryApi<Data, Vars>
			query={GET_SONG}
			variables={{ songId, userId }}
			className={bem("", "Padding")}
			children={({ data }) => data && (
				<p className="Text">
					{data.song.title}
				</p>
			)}
		/>
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

export default SongsPage