import { createElement, FC } from "react"

import Select from "../Select"
import { enumToString } from "../../helpers"
import { useSettingsContext } from "../../contexts/Settings"
import { Settings, DocOrderBy, OrderByDirection } from "../../types"

const OrderBy: FC<PropTypes> = ({ fieldOptions, settingsKey, className }) => {
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
				options={enumToString(OrderByDirection)}
			/>
		</div>
	)
}

type SettingsOrderByKey =
	Pick<Settings, "songsOrderBy" | "albumsOrderBy" | "genresOrderBy" | "artistsOrderBy">

interface PropTypes {
	className?: string,
	fieldOptions: string[],
	settingsKey: keyof SettingsOrderByKey,
}

export default OrderBy