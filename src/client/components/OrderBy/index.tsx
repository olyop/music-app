import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import Select from "../Select"
import { useSettingsContext } from "../../contexts/Settings"
import { OrderBySettings, DocOrderBy, OrderByDirection } from "../../types"

const bem = createBem("OrderBy")

const OrderBy: FC<PropTypes> = ({ fieldOptions, settingsKey, className }) => {
	const { settings, setSettings } =
		useSettingsContext()
	const handleChange =
		(orderByKey: keyof DocOrderBy) =>
			(val: string) =>
				setSettings(prevState => ({
					...prevState,
					[settingsKey]: {
						...prevState[settingsKey],
						[orderByKey]: val,
					},
				}))
	return (
		<div className={bem(className, "FlexListRight")}>
			<Select
				className={bem("")}
				onChange={handleChange("direction")}
				value={settings[settingsKey].direction}
				options={Object.keys(OrderByDirection)}
			/>
			<Select
				options={fieldOptions}
				className="MarginRightQuart"
				onChange={handleChange("field")}
				value={settings[settingsKey].field}
			/>
			<h1
				children="Order By:"
				className="Text2 MarginRightQuart"
			/>
		</div>
	)
}

interface PropTypes {
	className?: BemInput,
	fieldOptions: string[],
	settingsKey: keyof OrderBySettings,
}

export default OrderBy