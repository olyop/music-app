import { createElement, FC } from "react"
import { useMutation } from "@apollo/client"

import Icon from "../Icon"
import QueryApi from "../QueryApi"
import { UserDoc, Song } from "../../types"
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

import GET_SONG_IN_LIBRARY from "../../graphql/queries/songInLibrary.gql"

const InLibraryButton: FC<PropTypes> = ({ doc, className }) => {
	const userId = useUserContext()
	const docId = determineDocId(doc)
	const determineReturn = determineDocReturn(doc)
	const docName = determineReturn("Song", "Album", "Genre", "Artist")
	const variablesKey = `${docName.toLowerCase()}Id`
	const variables = { userId, [variablesKey]: docId }
	return (
		<QueryApi
			spinner={false}
			query={GET_SONG_IN_LIBRARY}
			children={
				(res: Data | undefined) => {
					const inLibrary = res.getSongInLibrary.inLibrary || false
					const verb = inLibrary ? "rm" : "add"
					const mutationName = `${verb}User${docName}`

					const MUTATION = inLibrary ?
						determineReturn(RM_USER_SONG, RM_USER_ALBUM, RM_USER_GENRE, RM_USER_ARTIST) :
						determineReturn(ADD_USER_SONG, ADD_USER_ALBUM, ADD_USER_GENRE, ADD_USER_ARTIST)

					const optimisticResponse = {
						[mutationName]: {
							__typename: docName,
							inLibrary: !inLibrary,
							[variablesKey]: docId,
						} as OptimisticRes,
					}

					const [ mutation, { loading, error } ] =
						// eslint-disable-next-line react-hooks/rules-of-hooks
						useMutation(MUTATION, { variables, optimisticResponse })

					if (error) {
						console.error(error)
					}

					function handleClick() {
						if (!loading) mutation()
					}

					return (
						<Icon
							onClick={handleClick}
							className={className}
							icon={loading || inLibrary ? "done" : "add"}
							title={`${inLibrary ? "Remove from" : "Add to"} Library`}
						/>
					)
				}
			}
		/>
	)
}

type OptimisticRes =
	Omit<UserDoc, "plays" | "dateAdded">

interface Data {
	getSongInLibrary: Song,
}

interface PropTypes {
	doc: UserDoc,
	className?: string,
}

export default InLibraryButton