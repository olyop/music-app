import isUndefined from "lodash/isUndefined"
import { createElement, FC, CSSProperties } from "react"
import { useQuery, useMutation } from "@apollo/client"

import Icon from "../Icon"
import { User, UserDoc } from "../../types"
import { useStateUserId } from "../../redux"
import { determineDocReturn, determineDocId } from "../../helpers"

// import GET_USER_SONGS from "../../graphql/queries/userSongs.gql"
// import GET_USER_ALBUMS from "../../graphql/queries/userAlbums.gql"
// import GET_USER_ARTISTS from "../../graphql/queries/userArtists.gql"

import GET_SONG_IN_LIB from "../../graphql/queries/songInLib.gql"
import GET_ALBUM_IN_LIB from "../../graphql/queries/albumInLib.gql"
import GET_ARTIST_IN_LIB from "../../graphql/queries/artistInLib.gql"

import RM_USER_SONG from "../../graphql/mutations/rmUserSong.gql"
import RM_USER_ALBUM from "../../graphql/mutations/rmUserAlbum.gql"
import RM_USER_ARTIST from "../../graphql/mutations/rmUserArtist.gql"

import ADD_USER_SONG from "../../graphql/mutations/addUserSong.gql"
import ADD_USER_ALBUM from "../../graphql/mutations/addUserAlbum.gql"
import ADD_USER_ARTIST from "../../graphql/mutations/addUserArtist.gql"

const InLibraryButton: FC<PropTypes> = ({ doc, style, className }) => {
	const dr =
		determineDocReturn(doc)
	const docName =
		dr("Song", "Album", "Artist")
	// const docsName =
	// 	dr("songs", "albums", "artists")
	// const orderByKey =
	// 	dr("userSongs", "userAlbums", "userArtists")
	const docKey =
		dr("songId", "albumId", "artistId")
	// const REFETCH_QUERY =
	// 	dr(GET_USER_SONGS, GET_USER_ALBUMS, GET_USER_ARTISTS)
	const QUERY =
		dr(GET_SONG_IN_LIB, GET_ALBUM_IN_LIB, GET_ARTIST_IN_LIB)

	const userId = useStateUserId()
	// const client = useApolloClient()
	const docId = determineDocId(doc)
	// const orderBy = useStateOrderBy(orderByKey)
	const variables = { userId, [docKey]: docId }

	const { data, loading: queryLoading } =
		useQuery<Res>(QUERY, { fetchPolicy: "cache-first", variables })

	const inLibrary =
		isUndefined(doc.inLibrary) ?
			(!data ? false : data[docName.toLowerCase()].inLibrary) : doc.inLibrary

	const verb = inLibrary ? "rm" : "add"
	const mutationName = `${verb}User${docName}`

	const MUTATION = inLibrary ?
		dr(RM_USER_SONG, RM_USER_ALBUM, RM_USER_ARTIST) :
		dr(ADD_USER_SONG, ADD_USER_ALBUM, ADD_USER_ARTIST)

	const [ mutation, { loading: mutationLoading } ] =
		useMutation<Res>(MUTATION, {
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
			// if (inLibrary) {
			// 	const { [docsName]: docs } = client.readQuery<User>({
			// 		query: REFETCH_QUERY,
			// 		variables: { orderBy, userId },
			// 	})!
			// 	client.writeQuery({
			// 		query: REFETCH_QUERY,
			// 		data: {
			// 			user: {
			// 				// @ts-ignore
			// 				// eslint-disable-next-line
			// 				[docsName]: docs.filter(doc => doc[docKey] === docId)
			// 			},
			// 		},
			// 	})
			// }
		}
	}

	return (
		<Icon
			style={style}
			onClick={handleClick}
			className={className}
			icon={inLibrary ? "done" : "add"}
			title={`${inLibrary ? "Remove from" : "Add to"} Library`}
		/>
	)
}

type Res = Record<string, UserDoc>

interface RefetchRes {
	user: User,
}

interface PropTypes {
	doc: UserDoc,
	className?: string,
	style?: CSSProperties,
}

export default InLibraryButton