import { createBem } from "@oly_op/bem"
import upperFirst from "lodash/upperFirst"
import { createElement, FC, ChangeEventHandler } from "react"

import {
	useDispatch,
	useStateUserId,
	updateListStyle,
	toggleShowGenres,
	useStateSettings,
} from "../../redux"

import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import GET_USER from "../../graphql/queries/user.gql"
import { ListStyle, User, UserVar } from "../../types"

import "./index.scss"

const bem = createBem("UserPage")

const UserPage: FC = () => {
	const dispatch =
		useDispatch()
	const userId =
		useStateUserId()
	const { showGenres, listStyle } =
		useStateSettings()
	const handleShowGenres =
		() => dispatch(toggleShowGenres())
	const handleListStyle: ChangeEventHandler<HTMLSelectElement> =
		({ target: { value } }) => dispatch(updateListStyle(value as ListStyle))
	return (
		<QueryApi<Res, UserVar>
			query={GET_USER}
			variables={{ userId }}
			className={bem("", "Padding")}
			children={
				({ data }) => data && (
					<Helmet title={data.user.name}>
						<h1 className={bem("name", "MarginBottom")}>
							{data.user.name}
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
								value={ListStyle.GRID}
								className={bem("select-option")}
								children={upperFirst(ListStyle.GRID.toLowerCase())}
							/>
							<option
								value={ListStyle.LIST}
								className={bem("select-option")}
								children={upperFirst(ListStyle.LIST.toLowerCase())}
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

interface Res {
	user: User,
}

export default UserPage