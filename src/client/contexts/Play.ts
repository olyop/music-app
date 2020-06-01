import { createContext } from "../helpers"

type PlayContext = {
	play: boolean,
	togglePlay: () => void,
}

const [ usePlayContext, PlayProvider ] =
	createContext<PlayContext>()

export { usePlayContext, PlayProvider, PlayContext }