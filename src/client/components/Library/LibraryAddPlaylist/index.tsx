import isEmpty from "lodash/isEmpty"
import { gql } from "@apollo/client"
import uniqueId from "lodash/uniqueId"
import { createBem } from "@oly_op/bem"
import type { Modifier, Reference } from "@apollo/client/cache"

import {
	FC,
	useState,
	createElement,
	ChangeEventHandler,
} from "react"

import Button from "../../Button"
import ADD_PLAYLIST from "./addPlaylist.gql"
import { getUserId } from "../../../helpers"
import { useMutation } from "../../../hooks"
import { Handler, Playlist } from "../../../types"

import "./index.scss"

const bem = createBem("ModalAddPlaylist")

const LibraryAddPlaylist: FC<PropTypes> = ({ onClose }) => {
	const userId = getUserId()
	const [ title, setTitle ] = useState("")

	const updatePlaylists =
		(doc: Reference): Modifier<Reference[]> =>
			existing => [...existing, doc]

	const [ addPlaylist ] =
		useMutation<Data, Vars>(ADD_PLAYLIST, {
			optimisticResponse: {
				addPlaylist: ({
					title,
					inLibrary: true,
					songsTotal: null,
					playlistId: uniqueId(),
					__typename: "Playlist",
					dateCreated: Date.now(),
				} as unknown) as Playlist,
			},
			update: (cache, { data }) => {
				const newPlaylistRef =
					cache.writeFragment<Playlist>({
						data: data!.addPlaylist,
						fragment: gql`
							fragment NewPlaylist on Playlist {
								title,
								inLibrary
								songsTotal
								playlistId
								dateCreated
							}
						`,
					})
				cache.modify({
					id: cache.identify({ userId, __typename: "User" }),
					fields: { playlists: updatePlaylists(newPlaylistRef!) },
				})
			},
		})

	const handleInput: ChangeEventHandler<HTMLInputElement> =
		event => setTitle(event.target.value)

	const handleSubmit =
		async () => {
			if (!isEmpty(title)) {
				try {
					await addPlaylist({ variables: { playlist: { title } } })
				} finally {
					onClose()
				}
			}
		}

	return (
		<div className="Padding">
			<h1 className="Heading2 MarginBottom">
				Create Playlist
			</h1>
			<input
				value={title}
				placeholder="Title"
				onChange={handleInput}
				className={bem("", "MarginBottom")}
			/>
			<Button
				icon="add"
				text="Create"
				onClick={handleSubmit}
				className={bem("submit")}
			/>
		</div>
	)
}

interface PropTypes {
	onClose: Handler,
}

interface Data {
	addPlaylist: Playlist,
}

interface Vars {
	playlist: Pick<Playlist, "title">,
}

export default LibraryAddPlaylist