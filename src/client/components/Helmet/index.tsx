import { createElement, useEffect, FC, Fragment } from "react"

const Helmet: FC<PropTypes> = ({ title, children }) => {
	useEffect(() => {
		document.title = `${title} - Music App`
	}, [title])
	return <Fragment>{children}</Fragment>
}

interface PropTypes {
	title: string,
}

export default Helmet