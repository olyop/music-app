import { Dispatch, SetStateAction } from "react"
import { createContext } from "../helpers"

interface LoadingContext {
	loading: boolean,
	setLoading: Dispatch<SetStateAction<boolean>>,
}

const [ useLoadingContext, LoadingProvider ] =
	createContext<LoadingContext>()

export { useLoadingContext, LoadingProvider, LoadingContext }