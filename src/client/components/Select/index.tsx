import startCase from "lodash/startCase"
import { createBem, BemInput } from "@oly_op/bem"
import { createElement, FC, ChangeEventHandler } from "react"

const bem = createBem("Select")

const Select: FC<PropTypes> = ({ value, options, onChange, className }) => {
	const handleChange: ChangeEventHandler<HTMLSelectElement> = event =>
		onChange(event.target.value)
	return (
		<select
			value={value}
			onChange={handleChange}
			className={bem(className, "Text")}
		>
			{options.map(
				option => (
					<option
						key={option}
						value={option}
						children={startCase(option.toLowerCase())}
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