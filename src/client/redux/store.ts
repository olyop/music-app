import { useDispatch as _useDispatch } from "react-redux"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import reducer from "./reducer"
import { Settings } from "../types"

const loadState = () => {
	const serializedState = localStorage.getItem("settings")
	return serializedState === null ?
		undefined : JSON.parse(serializedState) as Settings
}

export const store = configureStore({
	reducer,
	preloadedState: {
		settings: loadState(),
	},
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: ["CHANGE_MODAL", "CLEAR_MODAL"],
		},
	}),
})

store.subscribe(() => {
	const { settings } = store.getState()
	const serializedSettings = JSON.stringify(settings)
	localStorage.setItem("settings", serializedSettings)
})

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export const useDispatch = () => _useDispatch<Dispatch>()