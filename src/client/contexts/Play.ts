import { createContext } from "../helpers"

interface PlayContext {
	play: boolean,
	togglePlay: () => void,
	setPlay: (val: boolean) => void,
}

const [ usePlayContext, PlayProvider ] =
	createContext<PlayContext>()

export { usePlayContext, PlayProvider, PlayContext }