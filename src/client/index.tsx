import { render } from "react-dom"
import { createElement, FC } from "react"
import { BrowserRouter as ReactRouter } from "react-router-dom"

import Application from "./components/Application"
import ApolloClient from "./components/ApolloClient"
import Authenticate from "./components/Authenticate"

import "./index.scss"
import "./classes.scss"

const Index: FC = () => (
	<ReactRouter>
		<Authenticate>
			<ApolloClient>
				<Application/>
			</ApolloClient>
		</Authenticate>
	</ReactRouter>
)

render(
	<Index/>,
	document.getElementById("Application"),
)