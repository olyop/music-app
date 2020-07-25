import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"
import { StyledProps } from "@material-ui/core/styles"

const Root =
	styled(Box)({
		overflow: "hidden",
		position: "relative",
		"&::before": {
			content: "",
			display: "block",
			paddingTop: "100%",
		},
	})

const Inner =
	styled(Box)({
		top: 0,
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "50% 50%",
	})

const Img: FC<PropTypes> = ({ url, title, children, className }) => (
	<Root className={className} title={title}>
		<Inner
			className="img"
			style={{ backgroundImage: `url(${url})` }}
		/>
		{children}
	</Root>
)

interface PropTypes extends StyledProps {
	url: string,
	title?: string,
}

export default Img