import isUndefined from "lodash/isUndefined"

import RM_USER_SONG from "./rmUserSong.gql"
import RM_USER_ARTIST from "./rmUserArtist.gql"
import RM_USER_PLAYLIST from "./rmUserPlaylist.gql"

import ADD_USER_SONG from "./addUserSong.gql"
import ADD_USER_ARTIST from "./addUserArtist.gql"
import ADD_USER_PLAYLIST from "./addUserPlaylist.gql"

import { useQuery } from "../useQuery"
import { useMutation } from "../useMutation"
import { determineDocId } from "../determineDocId"
import { determineDocReturn } from "../determineDocReturn"

import GET_SONG_IN_LIBRARY from "./getSongInLibrary.gql"
import GET_ARTIST_IN_LIBRARY from "./getArtistInLibrary.gql"
import GET_PLAYLIST_IN_LIBRARY from "./getPlaylistInLibrary.gql"

import { UserVar, InLibraryDoc } from "../../types"
import { useStateUserId, useStateOrderBy } from "../../redux"

import GET_USER_SONGS from "../../components/Library/getUserSongs.gql"
import GET_USER_ARTISTS from "../../components/Library/getUserArtists.gql"
import GET_USER_PLAYLISTS from "../../components/Library/getUserPlaylists.gql"

export const useInLibrary = (doc: InLibraryDoc): ReturnType => {
	const dr = determineDocReturn(doc)
	const docTypeName = dr("Song", "Artist", "Playlist")
	const orderByKey = dr("userSongs", "userArtists", "userPlaylists")
	const docKey = dr("songId", "artistId", "playlistId") as VarKeyEnum
	const docQueryName = dr("song", "artist", "playlist") as QueryNameEnum

	const REFETCH_QUERY =
		dr(GET_USER_SONGS, GET_USER_ARTISTS, GET_USER_PLAYLISTS)

	const QUERY =
		dr(GET_SONG_IN_LIBRARY, GET_ARTIST_IN_LIBRARY, GET_PLAYLIST_IN_LIBRARY)

	const userId = useStateUserId()
	const docId = determineDocId(doc)
	const orderBy = useStateOrderBy(orderByKey)

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
			(data ? data[docQueryName]!.inLibrary : false) :
			doc.inLibrary

	const mutationName =
		`${inLibrary ? "rm" : "add"}User${docTypeName}` as MutationNameEnum

	const MUTATION = inLibrary ?
		dr(RM_USER_SONG, RM_USER_ARTIST, RM_USER_PLAYLIST) :
		dr(ADD_USER_SONG, ADD_USER_ARTIST, ADD_USER_PLAYLIST)

	const [ mutate, { loading } ] =
		useMutation<MutationData, Vars>(MUTATION, {
			variables,
			refetchQueries: [{
				query: REFETCH_QUERY,
				variables: { userId, orderBy, page: 0 },
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

	const handleClick = async () => {
		if (!loading) await mutate()
	}

	return [ handleClick, inLibrary ]
}

enum VarKeyEnum {
	songId = "songId",
	artistId = "artistId",
	playlistId = "playlistId"
}

enum QueryNameEnum {
	song = "song",
	artist = "artist",
	playlist = "playlist",
}

enum MutationNameEnum {
	rmUserSong = "rmUserSong",
	addUserSong = "addUserSong",
	rmUserArtist = "rmUserArtist",
	addUserArtist = "addUserArtist",
	rmUserPlaylist = "rmUserPlaylist",
	addUserPlaylist = "addUserPlaylist",
}

type Vars = {
	[key in VarKeyEnum]?: string
} & UserVar

type QueryData = { [key in QueryNameEnum]?: InLibraryDoc }
type MutationData = { [key in MutationNameEnum]?: InLibraryDoc }

type ReturnType = [ mutate: () => Promise<unknown>, inLibrary: boolean ]