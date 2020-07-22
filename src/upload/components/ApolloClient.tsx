import { createElement, FC } from "react"
import { ApolloProvider } from "@apollo/client"

import client from "../apollo"

const ApolloClient: FC = ({ children }) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
)

export default ApolloClient