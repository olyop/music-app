import { createElement, FC, ReactNode } from "react"
import { ApolloProvider } from "@apollo/react-hooks"

import client from "../../apollo"

type PropTypes = {
	children: ReactNode,
}

const ApolloClient: FC<PropTypes> = ({ children }) => (
	<ApolloProvider
		client={client}
		children={children}
	/>
)

export default ApolloClient