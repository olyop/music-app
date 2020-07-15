import { Dispatch, SetStateAction } from "react"

import { createContext } from "../helpers"

interface CurrentContext {
	current: number,
	setCurrent: Dispatch<SetStateAction<number>>,
}

const [ useCurrentContext, CurrentProvider ] =
	createContext<CurrentContext>()

export { useCurrentContext, CurrentProvider, CurrentContext }