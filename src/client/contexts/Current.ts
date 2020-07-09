import { createContext } from "../helpers"

interface CurrentContext {
	current: number,
	setCurrent: (val: number) => void,
}

const [ useCurrentContext, CurrentProvider ] =
	createContext<CurrentContext>()

export { useCurrentContext, CurrentProvider, CurrentContext }