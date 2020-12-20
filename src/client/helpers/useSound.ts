import {
	useState,
	useEffect,
	useCallback,
} from "react"

import { Howl } from "howler"

import { useHasMounted } from "./useHasMounted"

interface Options {
	volume: number,
	current: number,
}

export const useSound = (src: string, { volume, current }: Options) => {
	const hasMounted = useHasMounted()
	const [ isPlaying, setIsPlaying ] = useState(false)
	const [ sound, setSound ] = useState(new Howl({ src, volume }))

	useEffect(() => {
		if (hasMounted) {
			setSound(new Howl({ src, volume }))
		}
	}, [src])

	useEffect(() => {
		sound.volume(volume)
	}, [volume])

	useEffect(() => {
		if (!isPlaying) {
			sound.seek(current)
		}
	}, [current])

	const play = useCallback(
		() => {
			sound.play()
			sound.once("end", () => {
				setIsPlaying(false)
			})
			setIsPlaying(true)
		},
		[sound],
	)

	const stop = useCallback(
		() => {
			sound.stop()
			setIsPlaying(false)
		},
		[sound],
	)

	const pause = useCallback(
		() => {
			sound.pause()
			setIsPlaying(false)
		},
		[sound],
	)

	return {
		play,
		stop,
		pause,
		isPlaying,
	}
}