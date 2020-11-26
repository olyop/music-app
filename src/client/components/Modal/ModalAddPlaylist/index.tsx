import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"

import {
	FC,
	useState,
	createElement,
	ChangeEventHandler,
} from "react"

import Button from "../../Button"
import ADD_PLAYLIST from "./addPlaylist.gql"
import { useMutation } from "../../../helpers"
import { useStateUserId } from "../../../redux"
import { Playlist, UserVar } from "../../../types"
import GET_USER_PLAYLISTS from "../../Library/getUserPlaylists.gql"

import "./index.scss"

const bem = createBem("ModalAddPlaylist")

const ModalAddPlaylist: FC<PropTypes> = ({ onClose }) => {
	const userId = useStateUserId()
	const [ title, setTitle ] = useState("")

	const [ addPlaylist ] =
		useMutation<Data, Vars>(ADD_PLAYLIST, {
			refetchQueries: [{
				variables: { userId },
				query: GET_USER_PLAYLISTS,
			}],
		})

	const handleInput: ChangeEventHandler<HTMLInputElement> = event =>
		setTitle(event.target.value)

	const handleSubmit = async () => {
		if (!isEmpty(title)) {
			try {
				await addPlaylist({
					variables: {
						userId,
						playlist: { title },
					},
				})
			} finally {
				onClose()
			}
		}
	}

	return (
		<div className="Padding">
			<h1 className="Heading2 MarginBottom">
				New Playlist
			</h1>
			<input
				value={title}
				onChange={handleInput}
				className={bem("", "Text2 PaddingHalf MarginBottom")}
			/>
			<Button
				icon="add"
				text="Add"
				onClick={handleSubmit}
			/>
		</div>
	)
}

interface PropTypes {
	onClose: () => void,
}

interface Data {
	addPlaylist: Playlist,
}

interface Vars extends UserVar {
	playlist: {
		title: string,
	},
}

export default ModalAddPlaylist