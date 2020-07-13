import { createElement, FC, Fragment } from "react"

const Helmet: FC<PropTypes> = ({ title, children }) => {
	// eslint-disable-next-line node/no-process-env
	document.title = `${title} - ${process.env.APP_NAME!}`
	return <Fragment>{children}</Fragment>
}

interface PropTypes {
	title: string,
}

export default Helmet