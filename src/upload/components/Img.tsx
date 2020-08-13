import camelCase from "lodash/camelCase"
import { useEffect, createElement, FC, ChangeEventHandler } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

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

const Img: FC<PropTypes> = ({ img, onChange, title, children, className }) => {
	const handleChange: ChangeEventHandler<HTMLInputElement> = event =>
		onChange(event.target.files![0])
	useEffect(() => {
		const element = document.querySelector<HTMLImageElement>(`#${camelCase(title)}`)!
		const url = img ? URL.createObjectURL(img) : "null"
		element.style.backgroundImage = `url(${url})`
		return () => URL.revokeObjectURL(url)
	})
	return (
		<Root className={className} title={title}>
			<Input
				type="file"
				onChange={handleChange}
			/>
			<Inner
				className="img"
				id={camelCase(title)}
			/>
			{children}
		</Root>
	)
}

interface PropTypes {
	title: string,
	img: Blob | null,
	className?: string,
	onChange: (img: Blob) => void,
}

export default Img