import { useEffect, FC } from "react"

import {
	useSound,
	// useKeyPress,
	useHasMounted,
} from "../../hooks"

import {
	updatePlay,
	useDispatch,
	useStatePlay,
	useStateVolume,
	useStateCurrent,
} from "../../redux"

import { getMp3Url } from "../../helpers"

const BarAudio: FC<PropTypes> = ({ songId }) => {
	const dispatch = useDispatch()
	const statePlay = useStatePlay()
	const current = useStateCurrent()
	const hasMounted = useHasMounted()
	// const spacePress = useKeyPress(" ")
	const stateVolume = useStateVolume()

	const volume = stateVolume / 100

	const { play, pause, stop, isPlaying } =
		useSound(getMp3Url(songId), { volume, current })

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

	// useEffect(() => {
	// 	if (spacePress) {
	// 		dispatch(updatePlay(!statePlay))
	// 	}
	// }, [spacePress])

	useEffect(() => () => stop(), [])

	return null
}

interface PropTypes {
	songId: string,
}

export default BarAudio