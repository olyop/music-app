import {
	FC,
	useRef,
	Fragment,
	useEffect,
	createElement,
} from "react"

import useSound from "use-sound"

import { useStatePlay, useStateVolume } from "../../redux"

const getUrl = (songId: string) =>
	`https://music-app.s3-ap-southeast-2.amazonaws.com/catalog/${songId}/full.mp3`

const BarAudio: FC<PropTypes> = ({ songId, children }) => {
	const didMount = useRef(false)
	const statePlay = useStatePlay()
	const stateVolume = useStateVolume()

	const volume = stateVolume / 10

	const [ play, { pause, stop } ] =
		useSound(getUrl(songId), { volume })

	useEffect(() => {
		if (didMount.current) {
			if (statePlay) pause()
			else play()
		} else {
			didMount.current = true
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [play])

	useEffect(() => () => stop())

	return (
		<Fragment>
			{children}
		</Fragment>
	)
}

interface PropTypes {
	songId: string,
}

export default BarAudio