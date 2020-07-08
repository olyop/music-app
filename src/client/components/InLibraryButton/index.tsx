import { createElement } from "react"
import { useMutation } from "@apollo/react-hooks"

import Icon from "../Icon"
import ApiError from "../ApiError"
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

const InLibraryButton = <T extends UserDoc>({ doc, className }: PropTypes<T>) => {
	const determineReturn = determineDocReturn(doc)
	const variablesKey = determineReturn("songId", "albumId", "genreId", "artistId")
	const refetchQuery = `getUser${determineReturn("Song", "Album", "Genre", "Artist")}s`

	const { inLibrary } = doc
	const userId = useUserContext()
	const docId = determineDocId(doc)

	const MUTATION = inLibrary ?
		determineReturn(RM_USER_SONG, RM_USER_ALBUM, RM_USER_GENRE, RM_USER_ARTIST) :
		determineReturn(ADD_USER_SONG, ADD_USER_ALBUM, ADD_USER_GENRE, ADD_USER_ARTIST)

	const [ mutation, { loading, error } ] =
		useMutation(MUTATION, {
			refetchQueries: [ refetchQuery ],
			variables: { userId, [variablesKey]: docId },
		})

	if (error) {
		return <ApiError error={error}/>
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

interface PropTypes<T> {
	doc: T,
	className?: string,
}

export default InLibraryButton