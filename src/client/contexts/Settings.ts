import { Dispatch, SetStateAction } from "react"

import { Settings } from "../types"
import { createContext } from "../helpers"

interface SettingsContext {
	settings: Settings,
	setSettings: Dispatch<SetStateAction<Settings>>,
}

const [ useSettingsContext, SettingsProvider ] =
	createContext<SettingsContext>()

export { useSettingsContext, SettingsProvider, SettingsContext }