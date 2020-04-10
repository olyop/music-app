import React, { useContext } from "react"

import Icon from "../Icon"
import ApiError from "../ApiError"
import UserContext from "../../contexts/User"

import { useMutation } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"
import { determineReturnFromDoc } from "../../helpers"

import RM_USER_SONG from "../../graphql/mutations/rmUserSong.graphql"
import RM_USER_ALBUM from "../../graphql/mutations/rmUserAlbum.graphql"
import RM_USER_GENRE from "../../graphql/mutations/rmUserGenre.graphql"
import RM_USER_ARTIST from "../../graphql/mutations/rmUserArtist.graphql"

import ADD_USER_SONG from "../../graphql/mutations/addUserSong.graphql"
import ADD_USER_ALBUM from "../../graphql/mutations/addUserAlbum.graphql"
import ADD_USER_GENRE from "../../graphql/mutations/addUserGenre.graphql"
import ADD_USER_ARTIST from "../../graphql/mutations/addUserArtist.graphql"

const InLibraryButton = ({ doc, className }) => {

  const determineReturn = determineReturnFromDoc(doc)
  const variablesKey = determineReturn("songId", "albumId", "genreId", "artistId")
  const refetchQuery = `getUser${determineReturn("Song", "Album", "Genre", "Artist")}s`

  const { id: docId, inLibrary } = doc
  const userId = useContext(UserContext)

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
    />
  )
}

InLibraryButton.propTypes = propTypes
InLibraryButton.defaultProps = defaultProps

export default InLibraryButton
