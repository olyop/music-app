import { useEffect, createElement, FC, Fragment, ReactNode } from "react"

// eslint-disable-next-line node/no-process-env
const APP_NAME = process.env.APP_NAME!

const Helmet: FC<PropTypes> = ({ title, children }) => {
	useEffect(() => {
		document.title = `${title} - ${APP_NAME}`
	}, [title, children])
	return <Fragment>{children}</Fragment>
}

interface PropTypes {
	title: string,
	children: ReactNode,
}

export default Helmet