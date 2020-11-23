import { createBem } from "@oly_op/bem"
import upperFirst from "lodash/upperFirst"
import { createElement, FC, ChangeEventHandler, Fragment } from "react"

import {
	useDispatch,
	useStateUserId,
	updateListStyle,
	toggleShowGenres,
	useStateSettings,
} from "../../redux"

import Helmet from "../Helmet"
import Button from "../Button"
import Select from "../Select"
import GET_USER_PAGE from "./getUserPage.gql"
import { useMutation, useQuery } from "../../helpers"
import { ListStyle, User, UserVar } from "../../types"
import DELETE_USER_LIBRARY from "./deleteUserLibrary.gql"

import "./index.scss"

const bem = createBem("UserPage")

const UserPage: FC = () => {
	const dispatch = useDispatch()
	const userId = useStateUserId()
	const variables: UserVar = { userId }
	const { showGenres, listStyle } = useStateSettings()

	const { data } =
		useQuery<Data, UserVar>(GET_USER_PAGE, { variables })

	const [ deleteLibrary, { loading: mutationLoading } ] =
		useMutation<MutationData, UserVar>(DELETE_USER_LIBRARY, { variables })

	const handleShowGenres = () =>
		dispatch(toggleShowGenres())

	const handleLibraryDelete = async () => {
		await deleteLibrary()
	}

	const handleListStyle = (val: string) =>
		dispatch(updateListStyle(val as ListStyle))

	return (
		<div className={bem("", "Content PaddingTopBottom")}>
			{data && (
				<Helmet title={data.user.name}>
					<h1 className={bem("name", "MarginBottom")}>
						{data.user.name}
					</h1>
					<details className={bem("details", "MarginBottomHalf")}>
						<summary className={bem("summary", "Text2 MarginBottomHalf")}>
							Settings
						</summary>
						<div className={bem("content", "PaddingBottom")}>
							<h3 className="Text2 MarginBottomFifth">
								List Style
							</h3>
							<Select
								value={listStyle}
								onChange={handleListStyle}
								options={Object.keys(ListStyle)}
								className="Text MarginBottomHalf"
							/>
							<h3 className="Text2 MarginBottomFifth">
								Show Genres
							</h3>
							<input
								type="checkbox"
								className="Text"
								checked={showGenres}
								onChange={handleShowGenres}
							/>
						</div>
					</details>
					<details className={bem("details", "MarginBottomHalf")}>
						<summary className={bem("summary", "Text2 MarginBottomHalf")}>
							Stats
						</summary>
						<div className={bem("content", "PaddingBottom")}>
							<h3 className="Text2 MarginBottomFifth">
								<Fragment>Songs: </Fragment>
								{data.user.songsTotal || "none"}
							</h3>
							<h3 className="Text2">
								<Fragment>Artists: </Fragment>
								{data.user.artistsTotal || "none"}
							</h3>
						</div>
					</details>
					<details className={bem("details")}>
						<summary className={bem("summary", "Text2 MarginBottomHalf")}>
							Controls
						</summary>
						<div className={bem("content", "FlexListGap")}>
							<Button
								icon="delete"
								text="Delete Library"
								onClick={mutationLoading ? undefined : handleLibraryDelete}
							/>
							<Button
								text="Sign Out"
								icon="exit_to_app"
							/>
						</div>
					</details>
				</Helmet>
			)}
		</div>
	)
}

interface Data {
	user: User,
}

interface MutationData {
	deleteUserLibrary: User,
}

export default UserPage