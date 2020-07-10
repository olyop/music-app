import { createElement, useEffect, FC, Fragment } from "react"

const Helmet: FC<PropTypes> = ({ title, children }) => {
	useEffect(() => {
		// eslint-disable-next-line node/no-process-env
		document.title = `${title} - ${process.env.APP_NAME!}`
	}, [title])
	return <Fragment>{children}</Fragment>
}

interface PropTypes {
	title: string,
}

export default Helmet