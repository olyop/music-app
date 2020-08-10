import { createElement, FC, ChangeEventHandler } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

import { blobToDataUrl } from "../helpers"

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

const Input =
	styled("input")({
		top: 0,
		left: 0,
		zIndex: 2,
		opacity: 0,
		width: "100%",
		height: "100%",
		cursor: "pointer",
		position: "absolute",
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

const Img: FC<PropTypes> = ({ url, onChange, title, children, className }) => {
	const handleChange: ChangeEventHandler<HTMLInputElement> = async event =>
		onChange(await blobToDataUrl(event.target.files![0]))
	return (
		<Root className={className} title={title}>
			<Input
				type="file"
				onChange={handleChange}
			/>
			{url && (
				<Inner
					className="img"
					style={{ backgroundImage: `url(${url})` }}
				/>
			)}
			{children}
		</Root>
	)
}

interface PropTypes {
	title?: string,
	className?: string,
	url: string | null,
	onChange: (dataUrl: string) => void,
}

export default Img