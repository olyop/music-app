import isUndefined from "lodash/isUndefined"

import RM_USER_SONG from "./rmUserSong.gql"
import RM_USER_ARTIST from "./rmUserArtist.gql"

import ADD_USER_SONG from "./addUserSong.gql"
import ADD_USER_ARTIST from "./addUserArtist.gql"

import { useQuery } from "../useQuery"
import { useMutation } from "../useMutation"
import { determineDocId } from "../determineDocId"
import { determineDocReturn } from "../determineDocReturn"

import GET_SONG_IN_LIBRARY from "./getSongInLibrary.gql"
import GET_ARTIST_IN_LIBRARY from "./getArtistInLibrary.gql"

import { useStateUserId, useStateOrderBy } from "../../redux"
import { UserVar, InLibraryDoc, UserSongsOrderBy } from "../../types"

import GET_USER_SONGS from "../../components/Library/getUserSongs.gql"
import GET_USER_ARTISTS from "../../components/Library/getUserArtists.gql"

export const useInLibrary = (doc: InLibraryDoc): ReturnType => {
	const dr = determineDocReturn(doc)
	const docTypeName = dr("Song", "Artist")
	const orderByKey = dr("userSongs", "userArtists")
	const docKey = dr("songId", "artistId") as VarKeyEnum
	const docQueryName = dr("song", "artist") as QueryNameEnum

	const REFETCH_QUERY = dr(GET_USER_SONGS, GET_USER_ARTISTS)
	const QUERY = dr(GET_SONG_IN_LIBRARY, GET_ARTIST_IN_LIBRARY)

	const userId = useStateUserId()
	const docId = determineDocId(doc)
	const orderBy = useStateOrderBy<UserSongsOrderBy>(orderByKey)

	const variables: Vars =
		{ userId, [docKey]: docId }

	const { data } =
		useQuery<QueryData, Vars>(QUERY, {
			variables,
			hideLoading: true,
			fetchPolicy: "cache-first",
		})

	const inLibrary =
		isUndefined(doc.inLibrary) ?
			(data ?
				data[docQueryName]!.inLibrary :
				false) :
			doc.inLibrary

	const mutationName =
		`${inLibrary ? "rm" : "add"}User${docTypeName}` as MutationNameEnum

	const MUTATION = inLibrary ?
		dr(RM_USER_SONG, RM_USER_ARTIST) :
		dr(ADD_USER_SONG, ADD_USER_ARTIST)

	const [ mutate, { loading } ] =
		useMutation<MutationData, Vars>(MUTATION, {
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

	const handleClick = async () => mutate()

	return [ handleClick, { loading, inLibrary } ]
}

enum VarKeyEnum {
	songId = "songId",
	artistId = "artistId",
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

type Vars = {
	[key in VarKeyEnum]?: string
} & UserVar

type QueryData = { [key in QueryNameEnum]?: InLibraryDoc }
type MutationData = { [key in MutationNameEnum]?: InLibraryDoc }

interface ReturnInfo {
	loading: boolean,
	inLibrary: boolean,
}

type ReturnType = [ mutate: () => Promise<unknown>, info: ReturnInfo ]