import { createElement, FC } from "react"
import { ApolloProvider } from "@apollo/react-hooks"

import client from "../../apollo"

const ApolloClient: FC = ({ children }) => (
	<ApolloProvider
		client={client}
		children={children}
	/>
)

export default ApolloClient