import { configureStore } from "@reduxjs/toolkit"
import { useDispatch as _useDispatch } from "react-redux"

import reducer from "./reducer"
import { Settings } from "../types"

const loadState = () => {
	const serializedState = localStorage.getItem("settings")
	if (serializedState === null) {
		return undefined
	} else {
		return JSON.parse(serializedState) as Settings
	}
}

const preloadedState = { settings: loadState() }

export const store = configureStore({ reducer, preloadedState })

store.subscribe(() => {
	const { settings } = store.getState()
	const serializedSettings = JSON.stringify(settings)
	localStorage.setItem("settings", serializedSettings)
})

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export const useDispatch = () => _useDispatch<Dispatch>()