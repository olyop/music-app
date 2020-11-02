import { APP_NAME } from "@oly_op/music-app-common/globals"
import { useEffect, createElement, FC, Fragment } from "react"

const Helmet: FC<PropTypes> = ({ title, children }) => {
	useEffect(() => {
		if (title) document.title = `${title} - ${APP_NAME}`
	}, [title, children])
	return <Fragment>{children}</Fragment>
}

interface PropTypes {
	title?: string,
}

export default Helmet