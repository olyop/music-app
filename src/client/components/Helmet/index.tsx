import { useEffect, createElement, FC, Fragment, ReactNode } from "react"

const Helmet: FC<PropTypes> = ({ title, children }) => {
	useEffect(() => {
		// eslint-disable-next-line node/no-process-env
		document.title = `${title} - ${process.env.APP_NAME!}`
	}, [title, children])
	return <Fragment>{children}</Fragment>
}

interface PropTypes {
	title: string,
	children: ReactNode,
}

export default Helmet