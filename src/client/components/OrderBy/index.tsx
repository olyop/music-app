import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import {
	useDispatch,
	updateOrderBy,
	useStateOrderBy,
} from "../../redux"

import {
	DocOrderBy,
	OrderBySettings,
	OrderByDirection,
} from "../../types"

import Select from "../Select"

const bem = createBem("OrderBy")

const OrderBy: FC<PropTypes> = ({ className, settingsKey, fieldOptions }) => {
	const dispatch = useDispatch()
	const state = useStateOrderBy(settingsKey)
	const handleChange = (key: keyof DocOrderBy) => (val: string) =>
		dispatch(updateOrderBy({ key, val, settingsKey }))
	return (
		<div className={bem(className, "FlexListGapHalf")}>
			<h1
				className="Text2"
				children="Order By:"
			/>
			<Select
				value={state.field}
				options={fieldOptions}
				onChange={handleChange("field")}
			/>
			<Select
				className={bem("")}
				value={state.direction}
				onChange={handleChange("direction")}
				options={Object.keys(OrderByDirection)}
			/>
		</div>
	)
}

interface PropTypes extends BemPropTypes {
	fieldOptions: string[],
	settingsKey: keyof OrderBySettings,
}

export default OrderBy