import { useEffect, FC } from "react"

import {
	updatePlay,
	useDispatch,
	useStatePlay,
	useStateVolume,
	useStateCurrent,
} from "../../redux"

import getUrl from "./getUrl"
import { useSound, useHasMounted } from "../../helpers"

const BarAudio: FC<PropTypes> = ({ songId }) => {
	const dispatch = useDispatch()
	const statePlay = useStatePlay()
	const current = useStateCurrent()
	const hasMounted = useHasMounted()
	const stateVolume = useStateVolume()

	const volume = stateVolume / 100

	const { play, pause, stop, isPlaying } =
		useSound(getUrl(songId), { volume, current })

	useEffect(() => {
		if (hasMounted) {
			if (statePlay) play()
			else if (isPlaying) pause()
		}
	}, [statePlay])

	useEffect(() => {
		if (hasMounted && play && !isPlaying) {
			dispatch(updatePlay(false))
		}
	}, [isPlaying])

	useEffect(() => () => stop(), [])

	return null
}

interface PropTypes {
	songId: string,
}

export default BarAudio