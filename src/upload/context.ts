import { State } from "./types"
import { createContext } from "./helpers"

const [ useStateContext, StateContextProvider ] =
	createContext<State>()

export { useStateContext, StateContextProvider }