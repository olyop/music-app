import { createElement, FC } from "react"
import isUndefined from "lodash/isUndefined"

import {
	useQuery,
	useMutation,
	determineDocId,
	determineDocReturn,
} from "../../helpers"

import RM_USER_SONG from "./rmUserSong.gql"
import RM_USER_ARTIST from "./rmUserArtist.gql"

import ADD_USER_SONG from "./addUserSong.gql"
import ADD_USER_ARTIST from "./addUserArtist.gql"

import GET_SONG_IN_LIBRARY from "./getSongInLibrary.gql"
import GET_ARTIST_IN_LIBRARY from "./getArtistInLibrary.gql"

import Icon from "../Icon"
import { useStateUserId } from "../../redux"
import { Song, UserDoc } from "../../types"

interface TempData {
	addUserSong: Song,
}

// @ts-ignore
const isSong = (data: Data): data is TempData =>
	data.addUserSong.__typename === "Song"

const InLibraryButton: FC<PropTypes> = ({ doc, className }) => {
	const dr = determineDocReturn(doc)
	const docName = dr("Song", "Artist")
	const docKey = dr("songId", "artistId")
	const QUERY = dr(GET_SONG_IN_LIBRARY, GET_ARTIST_IN_LIBRARY)

	const userId = useStateUserId()
	const docId = determineDocId(doc)

	const variables = { userId, [docKey]: docId }

	const { data } =
		useQuery<Data>(QUERY, { fetchPolicy: "cache-first", variables })

	const inLibrary =
		isUndefined(doc.inLibrary) ?
			(!data ? false : data[docName.toLowerCase()].inLibrary) : doc.inLibrary

	const verb = inLibrary ? "rm" : "add"
	const mutationName = `${verb}User${docName}`

	const MUTATION = inLibrary ?
		dr(RM_USER_SONG, RM_USER_ARTIST) :
		dr(ADD_USER_SONG, ADD_USER_ARTIST)

	const [ mutation, { loading } ] =
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
			update: (cache, res) => {
				const tempData = res.data
				if (isSong(tempData!) && !inLibrary) {
					cache.modify({
						fields: {
							songs: (songs: Song[] = [], { readField }) =>
								[ ...songs, tempData.addUserSong ],
						},
					})
				}
			},
		})

	const handleClick = async () => mutation()

	return (
		<Icon
			className={className}
			icon={inLibrary ? "done" : "add"}
			onClick={loading ? undefined : handleClick}
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