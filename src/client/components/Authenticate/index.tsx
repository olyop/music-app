import { createElement, FC } from "react"

import { UserProvider } from "../../contexts/User"

const Authenticate: FC = ({ children }) => (
	<UserProvider value={process.env.USER_ID}>
		{children}
	</UserProvider>
)

export default Authenticate