import { render } from "react-dom"
import { createElement, FC, StrictMode } from "react"

import MaterialUi from "./components/MaterialUi"
import Application from "./components/Application"
import ApolloClient from "./components/ApolloClient"

const Index: FC = () => (
	<MaterialUi>
		<ApolloClient>
			<StrictMode>
				<Application/>
			</StrictMode>
		</ApolloClient>
	</MaterialUi>
)

render(
	<Index/>,
	document.getElementById("Application"),
)