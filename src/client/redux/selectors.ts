import { useSelector } from "react-redux"

import {
	Settings,
	ListStyle,
	DocOrderBy,
	OrderBySettings,
} from "../types"

import { State } from "./store"

export const useStatePlay =
	() => useSelector<State, boolean>(state => state.play)

export const useStateError =
	() => useSelector<State, Error[]>(state => state.errors)

export const useStateSidebar =
	() => useSelector<State, boolean>(state => state.sidebar)

export const useStateUserId =
	() => useSelector<State, string>(state => state.userId)

export const useStateCurrent =
	() => useSelector<State, number>(state => state.current)

export const useStateVolume =
	() => useSelector<State, number>(state => state.volume)

export const useStateLoading =
	() => useSelector<State, string[]>(state => state.loading)

export const useStateSettings =
	() => useSelector<State, Settings>(state => state.settings)

export const useStateShowGenres =
	() => useSelector<State, boolean>(state => state.settings.showGenres)

export const useStateListStyle =
	() => useSelector<State, ListStyle>(state => state.settings.listStyle)

export const useStateShowReleased =
	() => useSelector<State, boolean>(state => state.settings.showReleased)

export const useStateOrderBy =
	<T = string>(key: keyof OrderBySettings) =>
		useSelector<State, DocOrderBy<T>>(state => (
			(state.settings.orderBy[key] as unknown) as DocOrderBy<T>
		))