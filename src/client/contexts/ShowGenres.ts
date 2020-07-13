import { createContext } from "../helpers"

interface ShowGenresContext {
	showGenres: boolean,
	setShowGenres: (val: boolean) => void,
}

const [ useShowGenresContext, ShowGenresProvider ] =
	createContext<ShowGenresContext>()

export { useShowGenresContext, ShowGenresProvider, ShowGenresContext }