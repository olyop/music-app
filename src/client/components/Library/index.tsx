import { useState, createElement, FC } from "react"
import { Switch, Route, RouteComponentProps } from "react-router-dom"

import Modal from "../Modal"
import routes from "./routes"
import Button from "../Button"
import { User } from "../../types"
import Navigation from "../Navigation"
import LibraryShuffle from "./LibraryShuffle"
import LibraryAddPlaylist from "./LibraryAddPlaylist"
import { useDispatch, updatePlay } from "../../redux"
import { useResetPlayer, useMutation } from "../../hooks"
import SHUFFLE_USER_LIBRARY from "./userShuffleLibrary.gql"

const Library: FC<RouteComponentProps> = ({ match }) => {
	const dispatch = useDispatch()
	const resetPlayer = useResetPlayer()

	const [ shuffleModal, setShuffleModal ] =
		useState(false)

	const [ addPlaylistModal, setAddPlaylistModal ] =
		useState(false)

	const [ libraryShuffle ] =
		useMutation<ShuffleData>(SHUFFLE_USER_LIBRARY)

	const handleShuffleModalOpen =
		() => setShuffleModal(true)

	const handleShuffleModalClose =
		() => setShuffleModal(false)

	const handleAddPlaylistModalOpen =
		() => setAddPlaylistModal(true)

	const handleAddPlaylistModalClose =
		() => setAddPlaylistModal(false)

	const handleLibraryShuffle =
		async () => {
			handleShuffleModalClose()
			resetPlayer()
			await libraryShuffle()
			dispatch(updatePlay(true))
		}

	return (
		<section className="PaddingTopBottom">
			<h1
				children="Library"
				className="Heading1 Content PaddingBottomHalf"
			/>
			<Navigation
				routes={routes}
				path={match.path}
				className="MarginBottom"
				right={(
					<div className="FlexListGap">
						<Button
							text="Playlist"
							icon="playlist_add"
							onClick={handleAddPlaylistModalOpen}
						/>
						<Button
							icon="shuffle"
							text="Shuffle"
							onClick={handleShuffleModalOpen}
						/>
					</div>
				)}
			/>
			<Switch>
				{routes.map(
					route => (
						<Route
							key={route.id}
							component={route.component}
							path={match.path + route.path}
						/>
					),
				)}
			</Switch>
			{addPlaylistModal && (
				<Modal onClose={handleAddPlaylistModalClose}>
					<LibraryAddPlaylist
						onClose={handleAddPlaylistModalClose}
					/>
				</Modal>
			)}
			{shuffleModal && (
				<Modal onClose={handleShuffleModalClose}>
					<LibraryShuffle
						onClose={handleShuffleModalClose}
						onLibraryShuffle={handleLibraryShuffle}
					/>
				</Modal>
			)}
		</section>
	)
}

interface ShuffleData {
	userShuffleLibrary: User,
}

export default Library