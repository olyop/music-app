import { createElement, FC } from "react"

import { UserProvider } from "../../contexts/User"

const Authenticate: FC = ({ children }) => (
	<UserProvider
		children={children}
		value={process.env.USER_ID}
	/>
)

export default Authenticate