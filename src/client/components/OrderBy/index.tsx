import { useSelector } from "react-redux"
import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import {
	DocOrderBy,
	OrderBySettings,
	OrderByDirection,
} from "../../types"

import Select from "../Select"
import { useDispatch, State, updateOrderBy } from "../../redux"

const bem = createBem("OrderBy")

const OrderBy: FC<PropTypes> = ({ className, settingsKey, fieldOptions }) => {
	const dispatch =
		useDispatch()
	const state =
		useSelector<State, DocOrderBy>(
			({ settings: { orderBy } }) => orderBy[settingsKey],
		)
	const handleChange =
		(key: keyof DocOrderBy) =>
			(val: string) =>
				dispatch(updateOrderBy({ key, val, settingsKey }))
	return (
		<div className={bem(className, "FlexList")}>
			<h1
				children="Order By:"
				className="Text2 MarginRightQuart"
			/>
			<Select
				value={state.field}
				options={fieldOptions}
				className="MarginRightQuart"
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