import isUndefined from "lodash/isUndefined"

import RM_USER_SONG from "./rmUserSong.gql"
import ADD_USER_SONG from "./addUserSong.gql"
import RM_USER_ARTIST from "./rmUserArtist.gql"
import ADD_USER_ARTIST from "./addUserArtist.gql"
import RM_USER_PLAYLIST from "./rmUserPlaylist.gql"
import ADD_USER_PLAYLIST from "./addUserPlaylist.gql"
import GET_SONG_IN_LIBRARY from "./getSongInLibrary.gql"
import GET_ARTIST_IN_LIBRARY from "./getArtistInLibrary.gql"
import GET_PLAYLIST_IN_LIBRARY from "./getPlaylistInLibrary.gql"

import {
	Vars,
	QueryData,
	VarKeyEnum,
	UserDocsKey,
	DocTypeName,
	MutationData,
	QueryNameEnum,
	MutationNameEnum,
} from "./types"

import { useQuery } from "../useQuery"
import { InLibraryDoc } from "../../types"
import { useMutation } from "../useMutation"
import userFieldModifer from "./userFieldModifer"
import { determineDocId, determineDocReturn, getUserId } from "../../helpers"

export const useToggleInLibrary =
	(doc: InLibraryDoc) => {
		const dr = determineDocReturn(doc)
		const docTypeName = dr("Song", "Artist", "Playlist") as DocTypeName
		const docKey = dr("songId", "artistId", "playlistId") as VarKeyEnum
		const docQueryName = dr("song", "artist", "playlist") as QueryNameEnum
		const userDocsKey = `${docQueryName}s` as UserDocsKey

		const QUERY =
			dr(GET_SONG_IN_LIBRARY, GET_ARTIST_IN_LIBRARY, GET_PLAYLIST_IN_LIBRARY)

		const userId = getUserId()
		const docId = determineDocId(doc)
		const variables: Vars = { [docKey]: docId }

		const { data: inLibraryData } =
			useQuery<QueryData, Vars>(QUERY, {
				variables,
				hideLoading: true,
				fetchPolicy: "cache-first",
			})

		const inLibrary =
			isUndefined(doc.inLibrary) ?
				(inLibraryData ? inLibraryData[docQueryName]!.inLibrary : false) :
				doc.inLibrary

		const mutationName =
			`${inLibrary ? "rm" : "add"}User${docTypeName}` as MutationNameEnum

		const MUTATION = inLibrary ?
			dr(RM_USER_SONG, RM_USER_ARTIST, RM_USER_PLAYLIST) :
			dr(ADD_USER_SONG, ADD_USER_ARTIST, ADD_USER_PLAYLIST)

		const [ mutate, result ] =
			useMutation<MutationData, Vars>(MUTATION, {
				variables,
				optimisticResponse: {
					[mutationName]: {
						[docKey]: docId,
						inLibrary: !inLibrary,
						__typename: docTypeName,
					},
				},
				update: cache => {
					cache.modify({
						id: cache.identify({ userId, __typename: "User" }),
						fields: {
							[userDocsKey]: userFieldModifer({
								docId,
								docKey,
								inLibrary,
								docTypeName,
							})(cache),
						},
					})
				},
			})

		const handleClick =
			async () => {
				if (!result.loading) {
					await mutate()
				}
			}

		return [ handleClick, inLibrary, result ] as const
	}