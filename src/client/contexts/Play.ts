import { createContext } from "../helpers"

interface PlayContext {
	play: boolean,
	togglePlay: () => void,
}

const [ usePlayContext, PlayProvider ] =
	createContext<PlayContext>()

export { usePlayContext, PlayProvider, PlayContext }