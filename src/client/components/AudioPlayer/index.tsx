/* eslint-disable jsx-a11y/media-has-caption */
import { useQuery } from "@apollo/client"
import { useRef, useEffect, createElement, FC, Fragment } from "react"

import { User, UserVar } from "../../types"
import GET_USER_CURRENT from "./getUserCurrent.gql"
import { useStateUserId, useStatePlay } from "../../redux"

const getUrl = (songId: string) =>
	`https://music-app.s3-ap-southeast-2.amazonaws.com/catalog/${songId}/full.mp3`

const AudioPlayer: FC = ({ children }) => {
	const play = useStatePlay()
	const userId = useStateUserId()

	const variables = { userId }
	const { data } = useQuery<Data, UserVar>(GET_USER_CURRENT, { variables })
	const songId = data?.user.current?.songId || false

	// const context = useRef(new AudioContext())

	useEffect(() => {
		if (play && songId) {
			const loadAudio = async () => {
				const res = await fetch(getUrl(songId))
				const buffer = await res.arrayBuffer()
				console.log(buffer.byteLength)
			}
			loadAudio()
		}
	}, [play, songId])

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