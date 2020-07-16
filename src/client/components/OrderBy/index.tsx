import { createElement, FC } from "react"

import Select from "../Select"
import { useSettingsContext } from "../../contexts/Settings"

import {
	Settings,
	DocOrderBy,
	OrderByDirection,
} from "../../types"

const OrderBy: FC<PropTypes> = ({ className, settingsKey, fieldOptions }) => {
	const { setSettings, settings } =
		useSettingsContext()
	const handleChange =
		(orderByKey: keyof DocOrderBy<unknown>) =>
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
				className="Text MarginBottomQuart"
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

type SettingsOrderByKey =
	Pick<Settings, "songsOrderBy" | "genresOrderBy" | "artistsOrderBy">

interface PropTypes {
	className?: string,
	fieldOptions: string[],
	settingsKey: keyof SettingsOrderByKey,
}

export default OrderBy