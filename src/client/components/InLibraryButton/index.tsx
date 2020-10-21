import {
	FC,
	useRef,
	useEffect,
	createElement,
} from "react"

import uniqueId from "lodash/uniqueId"
import isUndefined from "lodash/isUndefined"
import { useQuery, useMutation } from "@apollo/client"

import {
	addError,
	addLoading,
	useDispatch,
	removeLoading,
	useStateUserId,
} from "../../redux"

import RM_USER_SONG from "./rmUserSong.gql"
import RM_USER_ARTIST from "./rmUserArtist.gql"

import ADD_USER_SONG from "./addUserSong.gql"
import ADD_USER_ARTIST from "./addUserArtist.gql"

import GET_SONG_IN_LIBRARY from "./getSongInLibrary.gql"
import GET_ARTIST_IN_LIBRARY from "./getArtistInLibrary.gql"

import Icon from "../Icon"
import { UserDoc } from "../../types"
import { determineDocReturn, determineDocId } from "../../helpers"

const InLibraryButton: FC<PropTypes> = ({ doc, className }) => {
	const dispatch = useDispatch()
	const queryId = useRef(uniqueId())
	const dr = determineDocReturn(doc)
	const docName = dr("Song", "Artist")
	const docKey = dr("songId", "artistId")
	const QUERY = dr(GET_SONG_IN_LIBRARY, GET_ARTIST_IN_LIBRARY)

	const userId = useStateUserId()
	const docId = determineDocId(doc)

	const variables = { userId, [docKey]: docId }

	const { data, loading: queryLoading } =
		useQuery<Data>(QUERY, { fetchPolicy: "cache-first", variables })

	const inLibrary =
		isUndefined(doc.inLibrary) ?
			(!data ? false : data[docName.toLowerCase()].inLibrary) : doc.inLibrary

	const verb = inLibrary ? "rm" : "add"
	const mutationName = `${verb}User${docName}`

	const MUTATION = inLibrary ?
		dr(RM_USER_SONG, RM_USER_ARTIST) :
		dr(ADD_USER_SONG, ADD_USER_ARTIST)

	const [ mutation, { error, loading: mutationLoading } ] =
		useMutation<Data>(MUTATION, {
			variables,
			optimisticResponse: {
				[mutationName]: {
					...doc,
					[docKey]: docId,
					__typename: docName,
					inLibrary: !inLibrary,
				},
			},
		})

	const handleClick = () => {
		if (!queryLoading && !mutationLoading) {
			mutation().catch(console.error)
		}
	}

	useEffect(() => {
		if (mutationLoading) {
			dispatch(addLoading(queryId.current))
		} else {
			dispatch(removeLoading(queryId.current))
		}
	}, [dispatch, mutationLoading])

	useEffect(() => {
		if (error) {
			dispatch(addError(error))
		}
	}, [error, dispatch])

	const icon = doc.__typename === "Song" ?
		(inLibrary ? "done" : "add") :
		(inLibrary ? "person" : "person_add")

	return (
		<Icon
			icon={icon}
			onClick={handleClick}
			className={className}
			title={`${inLibrary ? "Remove from" : "Add to"} Library`}
		/>
	)
}

type Data = Record<string, UserDoc>

interface PropTypes {
	doc: UserDoc,
	className?: string,
}

export default InLibraryButton