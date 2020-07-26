import { render } from "react-dom"
import DateFnsUtils from "@date-io/date-fns"
import { ApolloProvider } from "@apollo/client"
import { createElement, StrictMode, FC } from "react"

import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"

import theme from "./theme"
import apollo from "./apollo"
import Application from "./components/Application"

const Index: FC = () => (
	<ApolloProvider client={apollo}>
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<StrictMode>
						<Application/>
					</StrictMode>
				</MuiPickersUtilsProvider>
			</CssBaseline>
		</ThemeProvider>
	</ApolloProvider>
)

render(
	<Index/>,
	document.getElementById("Application"),
)