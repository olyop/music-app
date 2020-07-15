import { Dispatch, SetStateAction } from "react"
import { createContext } from "../helpers"

interface PlayContext {
	play: boolean,
	setPlay: Dispatch<SetStateAction<boolean>>,
}

const [ usePlayContext, PlayProvider ] =
	createContext<PlayContext>()

export { usePlayContext, PlayProvider, PlayContext }