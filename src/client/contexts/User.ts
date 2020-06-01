import { createContext } from "../helpers"

const [ useUserContext, UserProvider ] =
	createContext<string>()

export { useUserContext, UserProvider }