import { render } from "react-dom"
import { createElement, FC, StrictMode } from "react"
import { BrowserRouter as ReactRouter } from "react-router-dom"

import Application from "./components/Application"
import ApolloClient from "./components/ApolloClient"
import Authenticate from "./components/Authenticate"

import "./css/variables.scss"
import "./css/classes.scss"
import "./css/base.scss"

const Index: FC = () => (
	<StrictMode>
		<ReactRouter>
			<Authenticate>
				<ApolloClient>
					<Application/>
				</ApolloClient>
			</Authenticate>
		</ReactRouter>
	</StrictMode>
)

render(
	<Index/>,
	document.getElementById("Application"),
)