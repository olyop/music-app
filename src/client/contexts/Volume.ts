import { Dispatch, SetStateAction } from "react"

import { createContext } from "../helpers"

interface VolumeContext {
	volume: number,
	setVolume: Dispatch<SetStateAction<number>>,
}

const [ useVolumeContext, VolumeProvider ] =
	createContext<VolumeContext>()

export { useVolumeContext, VolumeProvider, VolumeContext }