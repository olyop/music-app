import { createBem } from "@oly_op/bem"
import upperFirst from "lodash/upperFirst"
import { createElement, FC, ChangeEventHandler } from "react"

import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { ListStyleEnum, User } from "../../types"
import GET_USER from "../../graphql/queries/user.gql"
import { useListStyleContext } from "../../contexts/ListStyle"
import { useShowGenresContext } from "../../contexts/ShowGenres"

import "./index.scss"

const bem = createBem("UserPage")

const UserPage: FC = () => {
	const { listStyle, setListStyle } =
		useListStyleContext()
	const { showGenres, setShowGenres } =
		useShowGenresContext()
	const handleListStyle: ChangeEventHandler<HTMLSelectElement> = event =>
		setListStyle(event.target.value as ListStyleEnum)
	const handleShowGenres: ChangeEventHandler<HTMLInputElement> = event =>
		setShowGenres(event.target.checked)
	return (
		<QueryApi
			query={GET_USER}
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