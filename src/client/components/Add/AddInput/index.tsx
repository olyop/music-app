import toNumber from "lodash/toNumber"
import { createBem } from "@oly_op/bem"
import { createElement, CSSProperties, ChangeEventHandler, FC } from "react"

import "./index.scss"

const bem = createBem("AddInput")

const determineWidth = (val: string, type: InputType) =>
	(val.length === 0 ? 1 : (
		(type === "text" ? val.length : (
			val < 10 ? 1 : 2))))

const AddInput: FC<PropTypes> = ({
	val,
	className,
	style = {},
	placeholder,
	handleChange,
	type = "text",
}) => {
	const onChange: ChangeEventHandler<HTMLInputElement> = event => {
		const { value } = event.target
		handleChange(type === "number" ? toNumber(value) : value)
	}
	return (
		<input
			type={type}
			value={val}
			autoCorrect="off"
			spellCheck="false"
			autoComplete="off"
			onChange={onChange}
			placeholder={placeholder}
			className={bem(className, "")}
			style={{
				...style,
				width: `${determineWidth(val, type)}ch`,
			}}
		/>
	)
}

type InputType = "text" | "number"

interface PropTypes {
	type?: InputType,
	className: string,
	placeholder?: string,
	style?: CSSProperties,
	val: string | number,
	handleChange: () => void,
}

export default AddInput