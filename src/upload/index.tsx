import { render } from "react-dom"
import { createElement, StrictMode, FC } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"

import Application from "./components/Application"
import ApolloClient from "./components/ApolloClient"

import "./index.scss"

const Index: FC = () => (
	<ApolloClient>
		<StrictMode>
			<CssBaseline>
				<Application/>
			</CssBaseline>
		</StrictMode>
	</ApolloClient>
)

render(
	<Index/>,
	document.getElementById("Application"),
)