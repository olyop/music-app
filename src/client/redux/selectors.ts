import { useSelector } from "react-redux"

import { State } from "./store"
import { ListStyle, Settings, OrderBySettings } from "../types"

export const useStatePlay = () =>
	useSelector<State, boolean>(state => state.play)

export const useStateLoading = () =>
	useSelector<State, boolean>(state => state.loading)

export const useStateSidebar = () =>
	useSelector<State, boolean>(state => state.sidebar)

export const useStateShowVolume = () =>
	useSelector<State, boolean>(state => state.showVolume)

export const useStateUserId = () =>
	useSelector<State, string>(state => state.userId)

export const useStateCurrent = () =>
	useSelector<State, number>(state => state.current)

export const useStateVolume = () =>
	useSelector<State, number>(state => state.volume)

export const useStateSettings = () =>
	useSelector<State, Settings>(state => state.settings)

export const useStateListStyle = () =>
	useSelector<State, ListStyle>(state => state.settings.listStyle)

export const useStateShowGenres = () =>
	useSelector<State, boolean>(state => state.settings.showGenres)

export const useStateOrderBy = <T>(key: keyof OrderBySettings) =>
	useSelector<State, T>(
		state => (state.settings.orderBy[key] as unknown) as T,
	)