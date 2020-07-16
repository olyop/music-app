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
	const handleShowGenres: ChangeEventHandler<HTMLInputElement> = event => {
		console.log(event.target)
		setSettings(prevState => ({
			...prevState,
			showGenres: event.target.checked,
		}))
	}
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
							value={listStyle}
							onChange={handleListStyle}
							className="Text MarginBottomHalf"
						>
							<option
								value={ListStyleEnum.GRID}
								className={bem("select-option")}
								children={upperFirst(ListStyleEnum.GRID)}
							/>
							<option
								value={ListStyleEnum.LIST}
								className={bem("select-option")}
								children={upperFirst(ListStyleEnum.LIST)}
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