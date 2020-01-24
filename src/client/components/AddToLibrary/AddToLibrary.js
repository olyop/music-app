import React, { useContext } from "react"

import Icon from "../Icon"
import UserCtx from "../../ctx/User"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { concat, includes, filter } from "lodash"
import { useMutation, useApolloClient } from "@apollo/react-hooks"

import ADD_LIBRARY_SONG from "../../graphql/mutations/addLibrarySong.graphql"
import ADD_LIBRARY_ALBUM from "../../graphql/mutations/addLibraryAlbum.graphql"
import LIBRARY_SONGS_FRAG from "../../graphql/fragments/librarySongsFrag.graphql"
import LIBRARY_ALBUMS_FRAG from "../../graphql/fragments/libraryAlbumsFrag.graphql"
import REMOVE_LIBRARY_SONG from "../../graphql/mutations/removeLibrarySong.graphql"
import REMOVE_LIBRARY_ALBUM from "../../graphql/mutations/removeLibraryAlbum.graphql"

import "./AddToLibrary.scss"

const bem = reactBem("AddSongToLibrary")

const AddToLibrary = ({ doc, className }) => {

  const user = useContext(UserCtx)
  const client = useApolloClient()
  const [ addUserSong ] = useMutation(ADD_LIBRARY_SONG)
  const [ addUserAlbum ] = useMutation(ADD_LIBRARY_ALBUM)
  const [ removeUserSong ] = useMutation(REMOVE_LIBRARY_SONG)
  const [ removeUserAlbum ] = useMutation(REMOVE_LIBRARY_ALBUM)

  const isSong = doc.__typename === "Song"
  const key = isSong ? "songs" : "albums"
  const variablesKey = isSong ? "songId" : "albumId"
  
  const { library } = user
  const { id: docId } = doc
  const { id: libraryId, [key]: docs } = library
  const variables = { libraryId, [variablesKey]: docId }

  const inLibrary = includes(docs.map(({ id }) => id), docId)

  const handleClick = () => {
    let newDocs
    if (inLibrary) {
      if (isSong) removeUserSong({ variables })
      else removeUserAlbum({ variables })
      newDocs = filter(docs, ({ id }) => id !== docId)
    } else {
      if (isSong) addUserSong({ variables })
      else addUserAlbum({ variables })
      newDocs = concat(docs, doc)
    }
    const fragment = isSong ? LIBRARY_SONGS_FRAG : LIBRARY_ALBUMS_FRAG
    const libraryFrag = { [key]: newDocs, __typename: "User" }
    client.writeFragment({ id: libraryId, fragment, data: libraryFrag })
  }

  return (
    <Icon
      onClick={handleClick}
      icon={inLibrary ? "done" : "add"}
      className={bem({ ignore: true, className }, "")}
    />
  )
}

AddToLibrary.propTypes = propTypes
AddToLibrary.defaultProps = defaultProps

export default AddToLibrary
