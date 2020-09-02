import { createElement, FC } from "react"

import Select from "../Select"
import { useSettingsContext } from "../../contexts/Settings"
import { OrderBySettings, DocOrderBy, OrderByDirection } from "../../types"

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
		<div className={className}>
			<h1
				children="Order By"
				className="Text2 MarginBottomQuart"
			/>
			<Select
				options={fieldOptions}
				className="MarginRightHalf"
				onChange={handleChange("field")}
				value={settings[settingsKey].field}
			/>
			<Select
				onChange={handleChange("direction")}
				value={settings[settingsKey].direction}
				options={Object.keys(OrderByDirection)}
			/>
		</div>
	)
}

interface PropTypes {
	className?: string,
	fieldOptions: string[],
	settingsKey: keyof OrderBySettings,
}

export default OrderBy