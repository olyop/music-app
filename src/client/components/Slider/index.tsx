import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Slider")

const Slider: FC<PropTypes> = ({ val, onChange, className }) => {
	const handleChange = () => onChange(0.5)
	return (
		<div className={bem(className, "")}>
			<div
				onChange={handleChange}
				className={bem("progress")}
				style={{ width: `${val * 100}%` }}
			/>
		</div>
	)
}

interface PropTypes {
	val: number,
	className?: BemInput,
	onChange: (val: number) => void,
}

export default Slider