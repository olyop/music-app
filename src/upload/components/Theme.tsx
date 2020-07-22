import { createElement, FC } from "react"
import { ThemeProvider } from "@material-ui/core/styles"

import theme from "../theme"

const Theme: FC = ({ children }) => (
	<ThemeProvider theme={theme}>
		{children}
	</ThemeProvider>
)

export default Theme