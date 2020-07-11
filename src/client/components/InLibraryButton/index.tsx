import { createElement, FC } from "react"
import { useMutation } from "@apollo/client"

import Icon from "../Icon"
import { UserDoc } from "../../types"
import { useUserContext } from "../../contexts/User"
import { determineDocReturn, determineDocId } from "../../helpers"

import RM_USER_SONG from "../../graphql/mutations/rmUserSong.gql"
import RM_USER_ALBUM from "../../graphql/mutations/rmUserAlbum.gql"
import RM_USER_GENRE from "../../graphql/mutations/rmUserGenre.gql"
import RM_USER_ARTIST from "../../graphql/mutations/rmUserArtist.gql"

import ADD_USER_SONG from "../../graphql/mutations/addUserSong.gql"
import ADD_USER_ALBUM from "../../graphql/mutations/addUserAlbum.gql"
import ADD_USER_GENRE from "../../graphql/mutations/addUserGenre.gql"
import ADD_USER_ARTIST from "../../graphql/mutations/addUserArtist.gql"

const InLibraryButton: FC<PropTypes> = ({ doc, className }) => {
	const determineReturn = determineDocReturn(doc)
	const variablesKey = determineReturn("songId", "albumId", "genreId", "artistId")

	const { inLibrary } = doc
	const userId = useUserContext()
	const docId = determineDocId(doc)

	const MUTATION = inLibrary ?
		determineReturn(RM_USER_SONG, RM_USER_ALBUM, RM_USER_GENRE, RM_USER_ARTIST) :
		determineReturn(ADD_USER_SONG, ADD_USER_ALBUM, ADD_USER_GENRE, ADD_USER_ARTIST)

	const [ mutation, { loading, error } ] =
		useMutation(
			MUTATION,
			{ variables: { userId, [variablesKey]: docId } },
		)

	if (error) {
		console.error(error)
	}

	const handleClick = () => mutation()

	return (
		<Icon
			onClick={handleClick}
			className={className}
			icon={loading || inLibrary ? "done" : "add"}
			title={`${inLibrary ? "Remove from" : "Add to"} Library`}
		/>
	)
}

interface PropTypes {
	doc: UserDoc,
	className?: string,
}

export default InLibraryButton