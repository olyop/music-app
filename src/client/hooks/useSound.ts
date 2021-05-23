import {
	useRef,
	useState,
	useEffect,
	useCallback,
} from "react"

import { Howl } from "howler"

import { useHasMounted } from "./useHasMounted"

export const useSound = (src: string, { volume, current }: Options) => {
	const isPlaying = useRef(false)
	const hasMounted = useHasMounted()

	const [ sound, setSound ] =
		useState(new Howl({ src, volume }))

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
				isPlaying.current = false
			})
			isPlaying.current = true
		},
		[sound],
	)

	const stop = useCallback(
		() => {
			sound.stop()
			isPlaying.current = false
		},
		[sound],
	)

	const pause = useCallback(
		() => {
			sound.pause()
			isPlaying.current = false
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

interface Options {
	volume: number,
	current: number,
}