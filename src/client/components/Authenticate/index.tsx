import { createElement, FC } from "react"

import { UserProvider } from "../../contexts/User"

// eslint-disable-next-line node/no-process-env
const { USER_ID } = process.env

const Authenticate: FC = ({ children }) => (
	<UserProvider value={USER_ID}>
		{children}
	</UserProvider>
)

export default Authenticate