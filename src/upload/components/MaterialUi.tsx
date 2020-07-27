import { createElement, FC } from "react"

import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeProvider from "@material-ui/styles/ThemeProvider"

import theme from "../theme"

const MaterialUi: FC = ({ children }) => (
	<ThemeProvider theme={theme}>
		<CssBaseline>
			{children}
		</CssBaseline>
	</ThemeProvider>
)

export default MaterialUi