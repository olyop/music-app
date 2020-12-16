import { useQuery } from "@apollo/client"
import { createElement, FC } from "react"
import { useParams } from "react-router-dom"

import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import { uuidAddDashes } from "../../helpers"
import USER_PLAYLISTS from "./userPlaylists.gql"

const AddSongToPlaylist: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const songId = uuidAddDashes(params.songId)

	const { data } =
		useQuery<Data, UserVar>(USER_PLAYLISTS, { variables: { userId } })

	console.log(songId)

	return (
		<div className="Heading1">
			{data?.user.playlists.length ?? "Loading..."}
		</div>
	)
}

interface Data {
	user: User,
}

interface Params {
	songId: string,
}

export default AddSongToPlaylist