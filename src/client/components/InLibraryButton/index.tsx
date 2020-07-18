import { createElement, FC } from "react"
import isUndefined from "lodash/isUndefined"
import { useQuery, useMutation } from "@apollo/client"

import Icon from "../Icon"
import { UserDoc } from "../../types"
import { useUserContext } from "../../contexts/User"
import { determineDocReturn, determineDocId } from "../../helpers"

import GET_SONG_IN_LIB from "../../graphql/queries/songInLib.gql"
import GET_ALBUM_IN_LIB from "../../graphql/queries/albumInLib.gql"
import GET_GENRE_IN_LIB from "../../graphql/queries/genreInLib.gql"
import GET_ARTIST_IN_LIB from "../../graphql/queries/artistInLib.gql"

import RM_USER_SONG from "../../graphql/mutations/rmUserSong.gql"
import RM_USER_ALBUM from "../../graphql/mutations/rmUserAlbum.gql"
import RM_USER_GENRE from "../../graphql/mutations/rmUserGenre.gql"
import RM_USER_ARTIST from "../../graphql/mutations/rmUserArtist.gql"

import ADD_USER_SONG from "../../graphql/mutations/addUserSong.gql"
import ADD_USER_ALBUM from "../../graphql/mutations/addUserAlbum.gql"
import ADD_USER_GENRE from "../../graphql/mutations/addUserGenre.gql"
import ADD_USER_ARTIST from "../../graphql/mutations/addUserArtist.gql"

import GET_USER_SONGS from "../../graphql/queries/userSongs.gql"
import GET_USER_ALBUMS from "../../graphql/queries/userAlbums.gql"
import GET_USER_GENRES from "../../graphql/queries/userGenres.gql"
import GET_USER_ARTISTS from "../../graphql/queries/userArtists.gql"
import { useSettingsContext } from "../../contexts/Settings"

const InLibraryButton: FC<PropTypes> = ({ doc, className }) => {
	const userId = useUserContext()
	const docId = determineDocId(doc)
	const { settings } = useSettingsContext()
	const dr = determineDocReturn(doc)

	const docName =
		dr("Song", "Album", "Genre", "Artist")
	const docKey =
		dr("songId", "albumId", "genreId", "artistId")
	const orderByKey =
		dr("songsOrderBy", "albumsOrderBy", "genresOrderBy", "artistsOrderBy")
	const QUERY =
		dr(GET_SONG_IN_LIB, GET_ALBUM_IN_LIB, GET_GENRE_IN_LIB, GET_ARTIST_IN_LIB)
	const REFETCH_QUERY =
		dr(GET_USER_SONGS, GET_USER_ALBUMS, GET_USER_GENRES, GET_USER_ARTISTS)

	const variables = { userId, [docKey]: docId }

	const { data, loading: queryLoading } =
		useQuery<Res>(QUERY, { variables })

	const inLibrary =
		isUndefined(doc.inLibrary) ?
			(isUndefined(data) ?
				false : data[docName.toLowerCase()].inLibrary) : doc.inLibrary

	const verb = inLibrary ? "rm" : "add"
	const mutationName = `${verb}User${docName}`

	const MUTATION = inLibrary ?
		dr(RM_USER_SONG, RM_USER_ALBUM, RM_USER_GENRE, RM_USER_ARTIST) :
		dr(ADD_USER_SONG, ADD_USER_ALBUM, ADD_USER_GENRE, ADD_USER_ARTIST)

	const [ mutation, { loading: mutationLoading } ] =
		useMutation(MUTATION, {
			variables,
			refetchQueries: [{
				query: REFETCH_QUERY,
				variables: { userId, orderBy: settings[orderByKey] },
			}],
			optimisticResponse: {
				[mutationName]: {
					[docKey]: docId,
					__typename: docName,
					inLibrary: !inLibrary,
				},
			},
		})

	const handleClick = () => {
		if (!queryLoading && !mutationLoading) mutation()
	}

	return (
		<Icon
			onClick={handleClick}
			className={className}
			icon={inLibrary ? "done" : "add"}
			title={`${inLibrary ? "Remove from" : "Add to"} Library`}
		/>
	)
}

type Res = Record<string, UserDoc>

interface PropTypes {
	doc: UserDoc,
	className?: string,
}

export default InLibraryButton