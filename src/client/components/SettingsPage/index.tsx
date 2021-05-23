import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"

import {
	useDispatch,
	updateListStyle,
	toggleShowGenres,
	useStateSettings,
	toggleShowReleased,
} from "../../redux"

import Helmet from "../Helmet"
import Button from "../Button"
import Select from "../Select"
import { removeJwt } from "../../helpers"
import { ListStyle, User } from "../../types"
import { useMutation, useQuery } from "../../hooks"
import GET_SETTINGS_PAGE from "./getSettingsPage.gql"
import DELETE_USER_LIBRARY from "./deleteUserLibrary.gql"

import "./index.scss"

const bem = createBem("SettingsPage")

const SettingsPage: FC = () => {
	const dispatch = useDispatch()

	const { listStyle, showGenres, showReleased } =
		useStateSettings()

	const { data } =
		useQuery<QueryData>(GET_SETTINGS_PAGE)

	const [ deleteLibrary, { loading: mutationLoading } ] =
		useMutation<MutationData>(DELETE_USER_LIBRARY)

	const handleShowGenres =
		() => dispatch(toggleShowGenres())

	const handleShowReleased =
		() => dispatch(toggleShowReleased())

	const handleLibraryDelete =
		async () => {
			await deleteLibrary()
			location.reload()
		}

	const handleListStyle =
		(val: string) =>
			dispatch(updateListStyle(val as ListStyle))

	const handleSignOut =
		() => {
			removeJwt()
			location.reload()
		}

	return (
		<div className={bem("", "Content PaddingTopBottom")}>
			{data && (
				<Helmet title="Settings">
					<h1 className={bem("name", "MarginBottom")}>
						Settings
					</h1>
					<details open className={bem("details", "MarginBottomHalf")}>
						<summary className={bem("summary", "Heading2 MarginBottomHalf")}>
							Settings
						</summary>
						<div className="PaddingLeft PaddingBottomHalf">
							<p className="Text MarginBottomFifth">
								List Style
							</p>
							<Select
								value={listStyle}
								onChange={handleListStyle}
								options={Object.keys(ListStyle)}
								className="Text MarginBottomHalf"
							/>
							<p className="Text MarginBottomFifth">
								Song Genres
							</p>
							<input
								type="checkbox"
								checked={showGenres}
								onChange={handleShowGenres}
								className="Text MarginBottomHalf"
							/>
							<p className="Text MarginBottomFifth">
								Album Released
							</p>
							<input
								type="checkbox"
								className="Text"
								checked={showReleased}
								onChange={handleShowReleased}
							/>
						</div>
					</details>
					<details open className={bem("details", "MarginBottomHalf")}>
						<summary className={bem("summary", "Heading2 MarginBottomHalf")}>
							Stats
						</summary>
						<div className="PaddingLeft PaddingBottomHalf">
							<p className="Text MarginBottomFifth">
								<Fragment>Songs: </Fragment>
								{data.user.songsTotal || "none"}
							</p>
							<p className="Text">
								<Fragment>Artists: </Fragment>
								{data.user.artistsTotal || "none"}
							</p>
						</div>
					</details>
					<details open className={bem("details")}>
						<summary className={bem("summary", "Heading2 MarginBottomHalf")}>
							Controls
						</summary>
						<div className="PaddingLeft">
							<Button
								icon="delete"
								text="Delete Library"
								className="MarginBottomHalf"
								onClick={mutationLoading ? undefined : handleLibraryDelete}
							/>
							<Button
								text="Sign Out"
								icon="exit_to_app"
								onClick={handleSignOut}
							/>
						</div>
					</details>
				</Helmet>
			)}
		</div>
	)
}

interface QueryData {
	user: User,
}

interface MutationData {
	deleteUserLibrary: User,
}

export default SettingsPage