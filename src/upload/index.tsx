import { render } from "react-dom"
import { createElement } from "react"

import MaterialUi from "./components/MaterialUi"
import Application from "./components/Application"
import ApolloClient from "./components/ApolloClient"

render(
	<MaterialUi>
		<ApolloClient>
			<Application/>
		</ApolloClient>
	</MaterialUi>,
	document.getElementById("Application"),
)