import { render } from "react-dom"
import { createElement, StrictMode } from "react"

import MaterialUi from "./components/MaterialUi"
import Application from "./components/Application"
import ApolloClient from "./components/ApolloClient"

render(
	<MaterialUi>
		<ApolloClient>
			<StrictMode>
				<Application/>
			</StrictMode>
		</ApolloClient>
	</MaterialUi>,
	document.getElementById("Application"),
)