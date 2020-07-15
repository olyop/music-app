import { createBem, BemInput } from "@oly_op/bem"
import { createElement, FC, ChangeEventHandler } from "react"

import "./index.scss"

const bem = createBem("Select")

const Select: FC<PropTypes> = ({ value, onChange, options, className }) => {
	const handleChange: ChangeEventHandler<HTMLSelectElement> = event =>
		onChange(event.target.value)
	return (
		<select
			value={value}
			onChange={handleChange}
			className={bem(className, "", "Text", "MarginBottomHalf")}
		>
			{options.map(
				option => (
					<option
						key={option}
						value={option}
						children={option}
						className={bem("option")}
					/>
				),
			)}
		</select>
	)
}

interface PropTypes {
	value: string,
	options: string[],
	className?: BemInput,
	onChange: (val: string) => void,
}

export default Select