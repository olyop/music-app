import { useQuery } from "@apollo/client"
import { createElement, FC, Fragment } from "react"

import { User, UserVar } from "../../types"
import GET_USER_CURRENT from "./getUserCurrent.gql"
import { useStateUserId } from "../../redux"

const getUrl = (songId: string) =>
	`https://music-app.s3-ap-southeast-2.amazonaws.com/catalog/${songId}/full.mp3`

const AudioPlayer: FC = ({ children }) => {
	const userId = useStateUserId()
	const variables = { userId }
	const { data } = useQuery<Data, UserVar>(GET_USER_CURRENT, { variables })
	const songId = data?.user.current?.songId || false
	const url = getUrl(songId || "")
	return (
		<Fragment>
			{children}
		</Fragment>
	)
}

interface Data {
	user: User,
}

export default AudioPlayer