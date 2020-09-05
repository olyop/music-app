import { useEffect, createElement, FC, Fragment } from "react"

const APP_NAME = process.env.APP_NAME!

const Helmet: FC<PropTypes> = ({ title, children }) => {
	useEffect(() => {
		document.title = `${title} - ${APP_NAME}`
	}, [title, children])
	return <Fragment>{children}</Fragment>
}

interface PropTypes {
	title: string,
}

export default Helmet