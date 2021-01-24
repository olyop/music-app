import { createElement, FC } from "react"
import DateFnsUtils from "@date-io/date-fns"

import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"

import theme from "../theme"

const MaterialUi: FC = ({ children }) => (
	<MuiPickersUtilsProvider utils={DateFnsUtils}>
		<ThemeProvider theme={theme}>
			<CssBaseline>
				{children}
			</CssBaseline>
		</ThemeProvider>
	</MuiPickersUtilsProvider>
)

export default MaterialUi