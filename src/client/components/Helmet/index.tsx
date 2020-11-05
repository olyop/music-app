import { APP_NAME } from "@oly_op/music-app-common/globals"
import { useEffect, createElement, FC, Fragment } from "react"

const setMetaTag =
	(type: string, text: string) =>
		document.querySelector<HTMLElement>(`meta[name="${type}"]`)!
			.setAttribute("content", text)

const setMetadata = (title: string) => {
	const text = `${title} - ${APP_NAME}`
	document.title = text
	setMetaTag("keywords", text)
	setMetaTag("og:title", text)
	setMetaTag("description", text)
	setMetaTag("og:description", text)
}

const Helmet: FC<PropTypes> = ({ title, children }) => {
	useEffect(() => {
		if (title) setMetadata(title)
	}, [title])
	return <Fragment>{children}</Fragment>
}

interface PropTypes {
	title?: string,
}

export default Helmet