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
import { useQuery } from "../../helpers"
import GET_USER_PAGE from "./getUserPage.gql"
import { ListStyle, User, UserVar } from "../../types"

import "./index.scss"

const bem = createBem("UserPage")

const UserPage: FC = () => {
	const dispatch = useDispatch()
	const userId = useStateUserId()
	const variables: UserVar = { userId }
	const { showGenres, listStyle } = useStateSettings()
	const { data } = useQuery<Data, UserVar>(GET_USER_PAGE, { variables })

	const handleShowGenres = () =>
		dispatch(toggleShowGenres())

	const handleListStyle: ChangeEventHandler<HTMLSelectElement> =
		({ target: { value } }) => dispatch(updateListStyle(value as ListStyle))

	return (
		<div className={bem("", "Content")}>
			{data && (
				<Helmet title={data.user.name}>
					<h1 className={bem("name", "MarginBottom")}>
						{data.user.name}
					</h1>
					<details open>
						<summary className="Text2 MarginBottomHalf">
							Settings
						</summary>
						<h3 className="Text2 MarginBottomFifth">
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
						<h3 className="Text2 MarginBottomFifth">
							Show Genres
						</h3>
						<input
							type="checkbox"
							className="Text"
							checked={showGenres}
							onChange={handleShowGenres}
						/>
					</details>
				</Helmet>
			)}
		</div>
	)
}

interface Data {
	user: User,
}

export default UserPage