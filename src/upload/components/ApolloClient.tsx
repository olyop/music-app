import { createElement, FC } from "react"
import { ApolloProvider } from "@apollo/client"

import apollo from "../apollo"

const ApolloClient: FC = ({ children }) => (
	<ApolloProvider client={apollo}>
		{children}
	</ApolloProvider>
)

export default ApolloClient