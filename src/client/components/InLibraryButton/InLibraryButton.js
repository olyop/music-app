import React, { useContext } from "react"

import Icon from "../Icon"
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

import SONG_IN_LIB_FRAG from "../../graphql/fragments/songInLibFrag.graphql"
import ALBUM_IN_LIB_FRAG from "../../graphql/fragments/albumInLibFrag.graphql"
import GENRE_IN_LIB_FRAG from "../../graphql/fragments/genreInLibFrag.graphql"
import ARTIST_IN_LIB_FRAG from "../../graphql/fragments/artistInLibFrag.graphql"

const InLibraryButton = ({ doc, className }) => {

  const determineReturn = determineReturnFromDoc(doc)
  const docTypeName = determineReturn("Song", "Album", "Genre", "Artist")
  const variablesKey = determineReturn("songId", "albumId", "genreId", "artistId")
  const mutationRmName = determineReturn("rmUserSong", "rmUserAlbum", "rmUserGenre", "rmUserArtist")
  const mutationAddName = determineReturn("addUserSong", "addUserAlbum", "addUserGenre", "addUserArtist")

  const { id: docId, inLibrary } = doc
  const userId = useContext(UserContext)
  const variables = { userId, [variablesKey]: docId }
  const mutationName = inLibrary ? mutationRmName : mutationAddName

  const MUTATION = inLibrary ?
    determineReturn(RM_USER_SONG, RM_USER_ALBUM, RM_USER_GENRE, RM_USER_ARTIST) :
    determineReturn(ADD_USER_SONG, ADD_USER_ALBUM, ADD_USER_GENRE, ADD_USER_ARTIST)

  const DOC_FRAG =
    determineReturn(SONG_IN_LIB_FRAG, ALBUM_IN_LIB_FRAG, GENRE_IN_LIB_FRAG, ARTIST_IN_LIB_FRAG)

  const optimisticResponse = {
    [mutationName]: {
      id: docId,
      inLibrary: !inLibrary,
      __typename: docTypeName,
    },
  }

  const update = (proxy, result) => {
    proxy.writeFragment({
      id: docId,
      fragment: DOC_FRAG,
      data: {
        __typename: docTypeName,
        ...result.data[mutationName],
      },
    })
  }

  const [ mutation ] = useMutation(
    MUTATION,
    { variables, update, optimisticResponse },
  )

  const handleClick = () => mutation()

  return (
    <Icon
      onClick={handleClick}
      className={className}
      icon={inLibrary ? "done" : "add"}
    />
  )
}

InLibraryButton.propTypes = propTypes
InLibraryButton.defaultProps = defaultProps

export default InLibraryButton
