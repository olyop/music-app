import { Provider } from "react-redux"
import { createElement, FC } from "react"

import { store } from "./store"

export const ReactRedux: FC = ({ children }) => (
	<Provider store={store}>{children}</Provider>
)