import React, { useContext } from "react"

import Icon from "../Icon"
import ApiError from "../ApiError"
import UserContext from "../../contexts/User"

import { propTypes } from "./props"
import { useMutation } from "@apollo/react-hooks"
import { determineReturnFromDoc, determineDocIdKey } from "../../helpers"

import RM_USER_SONG from "../../graphql/mutations/rmUserSong.gql"
import RM_USER_ALBUM from "../../graphql/mutations/rmUserAlbum.gql"
import RM_USER_GENRE from "../../graphql/mutations/rmUserGenre.gql"
import RM_USER_ARTIST from "../../graphql/mutations/rmUserArtist.gql"

import ADD_USER_SONG from "../../graphql/mutations/addUserSong.gql"
import ADD_USER_ALBUM from "../../graphql/mutations/addUserAlbum.gql"
import ADD_USER_GENRE from "../../graphql/mutations/addUserGenre.gql"
import ADD_USER_ARTIST from "../../graphql/mutations/addUserArtist.gql"

const InLibraryButton = ({ doc, className }) => {

  const determineReturn = determineReturnFromDoc(doc)
  const variablesKey = determineReturn("songId", "albumId", "genreId", "artistId")
  const refetchQuery = `getUser${determineReturn("Song", "Album", "Genre", "Artist")}s`

  const { inLibrary } = doc
  const userId = useContext(UserContext)
  const docId = doc[determineDocIdKey(doc)]

  const MUTATION = inLibrary ?
    determineReturn(RM_USER_SONG, RM_USER_ALBUM, RM_USER_GENRE, RM_USER_ARTIST) :
    determineReturn(ADD_USER_SONG, ADD_USER_ALBUM, ADD_USER_GENRE, ADD_USER_ARTIST)

  const [ mutation, { loading, error } ] = useMutation(MUTATION, {
    refetchQueries: [refetchQuery],
    variables: { userId, [variablesKey]: docId },
  })

  if (error) {
    return <ApiError error={error} />
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

InLibraryButton.propTypes = propTypes

export default InLibraryButton
