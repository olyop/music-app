import { createContext } from "../helpers"

const [ useVolumeContext, VolumeProvider ] =
	createContext<number>()

export { useVolumeContext, VolumeProvider }