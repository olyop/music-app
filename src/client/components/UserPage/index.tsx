import { createBem } from "@oly_op/bem"
import upperFirst from "lodash/upperFirst"
import { createElement, FC, ChangeEventHandler } from "react"

import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { ListStyleEnum, User } from "../../types"
import { useUserContext } from "../../contexts/User"
import GET_USER from "../../graphql/queries/user.gql"
import { useSettingsContext } from "../../contexts/Settings"

import "./index.scss"

const bem = createBem("UserPage")

const UserPage: FC = () => {
	const userId =
		useUserContext()
	const { setSettings, settings: { showGenres, listStyle } } =
		useSettingsContext()
	const handleListStyle: ChangeEventHandler<HTMLSelectElement> = event =>
		setSettings(prevState => ({
			...prevState,
			listStyle: event.target.value as ListStyleEnum,
		}))
	const handleShowGenres: ChangeEventHandler<HTMLInputElement> = event =>
		setSettings(prevState => ({
			...prevState,
			showGenres: event.target.checked,
		}))
	return (
		<QueryApi
			query={GET_USER}
			variables={{ userId }}
			className={bem("", "Padding")}
			children={
				({ user }: Data) => (
					<Helmet title={user.name}>
						<h1 className={bem("name", "MarginBottom")}>
							{user.name}
						</h1>
						<h3 className={bem("option-text")}>
							List Style
						</h3>
						<select
							onChange={handleListStyle}
							value={listStyle || "grid"}
							className="Text MarginBottomHalf"
						>
							<option
								value={ListStyleEnum.grid}
								className={bem("select-option")}
								children={upperFirst(ListStyleEnum.grid)}
							/>
							<option
								value={ListStyleEnum.list}
								className={bem("select-option")}
								children={upperFirst(ListStyleEnum.list)}
							/>
						</select>
						<h3 className={bem("option-text")}>
							Show Genres
						</h3>
						<input
							type="checkbox"
							className="Text"
							checked={showGenres}
							onChange={handleShowGenres}
						/>
					</Helmet>
				)
			}
		/>
	)
}

interface Data {
	user: User,
}

export default UserPage