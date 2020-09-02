import { Dispatch, SetStateAction } from "react"
import { createContext } from "../helpers"

interface ShowLoadingContext {
	showLoading: boolean,
	setShowLoading: Dispatch<SetStateAction<boolean>>,
}

const [ useShowLoadingContext, ShowLoadingProvider ] =
	createContext<ShowLoadingContext>()

export { useShowLoadingContext, ShowLoadingProvider, ShowLoadingContext }