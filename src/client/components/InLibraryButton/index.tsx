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

import GET_USER_SONGS from "../Library/getUserSongs.gql"
import GET_USER_ARTISTS from "../Library/getUserArtists.gql"

import GET_SONG_IN_LIBRARY from "./getSongInLibrary.gql"
import GET_ARTIST_IN_LIBRARY from "./getArtistInLibrary.gql"

import Icon from "../Icon"
import { InLibraryDoc } from "../../types"
import { useStateUserId, useStateOrderBy } from "../../redux"

const InLibraryButton: FC<PropTypes> = ({ doc, className }) => {
	const dr = determineDocReturn(doc)
	const docKey = dr("songId", "artistId")
	const docTypeName = dr("Song", "Artist")
	const orderByKey = dr("userSongs", "userArtists")
	const docQueryName = dr("song", "artist") as QueryNameEnum

	const REFETCH_QUERY = dr(GET_USER_SONGS, GET_USER_ARTISTS)
	const QUERY = dr(GET_SONG_IN_LIBRARY, GET_ARTIST_IN_LIBRARY)

	const userId = useStateUserId()
	const docId = determineDocId(doc)
	const orderBy = useStateOrderBy(orderByKey)

	const variables = { userId, [docKey]: docId }

	const { data } =
		useQuery<QyeryData>(QUERY, {
			variables,
			fetchPolicy: "cache-first",
		})

	const inLibrary =
		isUndefined(doc.inLibrary) ?
			(data ?
				data[docQueryName]!.inLibrary :
				false) :
			doc.inLibrary

	const verb = inLibrary ? "rm" : "add"
	const mutationName = `${verb}User${docTypeName}` as MutationNameEnum

	const MUTATION = inLibrary ?
		dr(RM_USER_SONG, RM_USER_ARTIST) :
		dr(ADD_USER_SONG, ADD_USER_ARTIST)

	const [ mutation, { loading } ] =
		useMutation<MutationData>(MUTATION, {
			variables,
			refetchQueries: [{
				query: REFETCH_QUERY,
				variables: { userId, page: 0, orderBy },
			}],
			optimisticResponse: {
				[mutationName]: {
					...doc,
					[docKey]: docId,
					inLibrary: !inLibrary,
					__typename: docTypeName,
				},
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

enum QueryNameEnum {
	song = "song",
	artist = "artist",
}

enum MutationNameEnum {
	rmUserSong = "rmUserSong",
	addUserSong = "addUserSong",
	rmUserArtist = "rmUserArtist",
	addUserArtist = "addUserArtist",
}

export type QyeryData = { [key in QueryNameEnum]?: InLibraryDoc }
export type MutationData = { [key in MutationNameEnum]?: InLibraryDoc }

interface PropTypes {
	doc: InLibraryDoc,
	className?: string,
}

export default InLibraryButton