import { ListStyleEnum } from "../types"
import { createContext } from "../helpers"

interface ListStyleContext {
	listStyle: ListStyleEnum,
	setListStyle: (val: ListStyleEnum) => void,
}

const [ useListStyleContext, ListStyleProvider ] =
	createContext<ListStyleContext>()

export { useListStyleContext, ListStyleProvider, ListStyleContext }