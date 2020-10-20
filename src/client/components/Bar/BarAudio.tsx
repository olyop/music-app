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
	const isMount = useHasMounted()
	const statePlay = useStatePlay()
	const current = useStateCurrent()
	const stateVolume = useStateVolume()

	const volume = stateVolume / 100

	const { play, pause, stop, isPlaying } =
		useSound(getUrl(songId), { volume, current })

	useEffect(() => {
		if (isMount) {
			if (statePlay) play()
			else pause()
		}
	}, [statePlay])

	useEffect(() => {
		if (isMount && play && !isPlaying) {
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