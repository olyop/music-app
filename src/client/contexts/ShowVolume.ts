import { Dispatch, SetStateAction } from "react"
import { createContext } from "../helpers"

interface ShowVolumeContext {
	showVolume: boolean,
	setShowVolume: Dispatch<SetStateAction<boolean>>,
}

const [ useShowVolumeContext, ShowVolumeProvider ] =
	createContext<ShowVolumeContext>()

export { useShowVolumeContext, ShowVolumeProvider, ShowVolumeContext }